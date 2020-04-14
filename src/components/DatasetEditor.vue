<template>
  <div>
    <span v-for="t in orderedQuads" :key="t.id">
      <quad-editor v-model="t.quad" />
    </span>
    ... quads ...
    <br />
    <button>Add quad</button>
  </div>
</template>
<script lang="ts">
import { Component, Prop, PropSync, Vue } from "vue-property-decorator";
import * as Factory from "@rdfjs/data-model";
import * as Dataset from "@rdfjs/dataset";
import * as RDF from "rdf-js";
import QuadEditor from "@/components/QuadEditor.vue";

type QuadHolder = {
  id: any;
  quad: RDF.Quad;
};

let uuid = 0;

@Component({
  components: { QuadEditor }
})
export default class DatasetEditor extends Vue {
  @Prop() value!: RDF.DatasetCore;

  uuid!: string;

  beforeCreate() {
    this.uuid = uuid.toString();
    uuid += 1;
  }

  previousHolders: Map<RDF.Quad, QuadHolder> = new Map();

  get orderedQuads() {
    let result = new Array<QuadHolder>();
    let i = 0;
    let self = this;
    const currentHolders: Map<RDF.Quad, QuadHolder> = new Map();
    for (let quad of this.value) {
      console.log(self.uuid, "previousHolders: "+self.previousHolders.size);
      let holder = self.previousHolders.get(quad)
      if (!holder) {
        holder = {
          id: "",
          get quad() {
            return quad;
          },
          set quad(q: RDF.Quad) {
            console.log(self.uuid, "deleting/adding", JSON.stringify(quad), JSON.stringify(q));
            self.previousHolders.delete(quad);
            self.value.delete(quad);
            if (q != null) {
              self.value.add(q);
            } else {
              console.log("removing quad")
            }
            quad = q;
            self.previousHolders.set(q, this);
            self.$emit("input", Dataset.dataset(self.value));
          }
        };
      }
      currentHolders.set(quad, holder);
      result.push(holder);
    }
    self.previousHolders = currentHolders;
    const sorted = result.sort((a: QuadHolder, b: QuadHolder) => {
      interface chainable {
        then(f: () => number): chainable;
        finally(t: () => number): number;
      }

      function first(f: () => number) : chainable {
        const fr = f();
        const result = {
          then: function(t: () => number) : chainable {
            if (fr === 0) {
              return first(t);
            } else {
              return result;
            }
          },
          finally: function(t: () => number) {
            if (fr === 0) {
              return t();
            } else {
              return fr;
            }
          }
        }
        return result;
      }

      function compare(field: 'graph'|'subject'|'predicate'|'object'): () => number {
        return () => {
          if (a.quad[field].value < b.quad[field].value) {
            return -1;
          } else {
            if (a.quad[field].value > b.quad[field].value) {
              return 1;
            } else {
              return 0;
            }
          }
        }
      }
      return first(compare('graph'))
            .then(compare('subject'))
            .then(compare('predicate'))
            .finally(compare('object'));
    });
    const zero = {id: 0}
    const max = sorted.reduce((previous, current) => previous.id > current.id ? previous : current, zero);
    let j = max.id;
    sorted.forEach(holder => {
      if (!holder.id) {
        holder.id = ++j;
      }
    });
    //console.log(self.uuid, "sorted", JSON.stringify(sorted));
    return sorted;
  }
}
</script>