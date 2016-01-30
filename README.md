# damm

A Google Apps Script implementation of the Damm algorithm, a check digit algorithm
created by H. Michael Damm. It detects all single-digit errors and adjacent
transposition errors (swapping adjacent numbers). For more information see the
[Wikipedia article](https://en.wikipedia.org/wiki/Damm_algorithm) which includes
a description of the algorithm and links to the relevant papers.

This fork has been modified from the
[original node.js implementation by Ion Drive](https://github.com/iondrive/damm)
to allow adding the custom functions `damm_generate`, `damm_append` and
`damm_verify` to a Google Sheets file.

## Install

To use, you'll need to create a copy of this script that's
[bound](https://developers.google.com/apps-script/guides/bound) to your Google
Sheets file. Here's how to do that:

1. In the Google Sheets file where you'd like to use these custom functions,
   open the Script editor (Tools > Script Editor...)
2. Replace the contents of a new script file with the contents of
   [damm.js](https://raw.githubusercontent.com/eemeli/damm/master/damm.js).
3. Save the script file.
4. You should now be able to use the provided functions in the file, with
   autocompletion support.

## Examples

```
=damm_generate(572)
-> 4

=damm_append(572)
-> 5724

=damm_verify(5724)
-> TRUE

=damm_verify(5734)
-> FALSE

=damm_verify(5274)
-> FALSE

=damm_append(arrayformula(row(A10:A14)))
-> 101
   117
   125
   130
   149
```
