/* eslint-disable */
//copied from https://raw.githubusercontent.com/retog/rdf-string.js/patch-1/lib/TermUtil.ts

import * as DataFactory from "@rdfjs/data-model";
import * as RDF from "rdf-js";

/**
 * Utility methods for converting between string-based RDF representations and RDFJS objects.
 *
 * RDF Terms are represented as follows:
 * * Blank nodes: '_:myBlankNode'
 * * Variables:   '_myVariable'
 * * Literals:    '"myString"', '"myLanguageString"@en-us', '"<p>e</p>"^^<http://www.w3.org/1999/02/22-rdf-syntax-ns#HTML>'
 * * URIs:        '<http://example.org>'
 *
 * Quads/triples are represented as hashes with 'subject', 'predicate', 'object' and 'graph' (optional)
 * as keys, and string-based RDF terms as values.
 */

/**
 * Convert an RDFJS term to a string-based representation.
 * @param {RDF.Term} term An RDFJS term.
 * @return {string} A string-based term representation.
 */
export function termToString(term: RDF.Term): string {
  switch (term.termType) {
  case 'NamedNode': return '<'+term.value+'>';
  case 'BlankNode': return '_:' + term.value;
  case 'Literal':
    const literalValue: RDF.Literal = <RDF.Literal> term;
    return '"' + literalValue.value + '"' +
      (literalValue.datatype &&
      literalValue.datatype.value !== 'http://www.w3.org/2001/XMLSchema#string' &&
      literalValue.datatype.value !== 'http://www.w3.org/1999/02/22-rdf-syntax-ns#langString' ?
        '^^<' + literalValue.datatype.value+'>' : '') +
      (literalValue.language ? '@' + literalValue.language : '');
  case 'Variable': return '?' + term.value;
  case 'DefaultGraph': return term.value;
  }
}

