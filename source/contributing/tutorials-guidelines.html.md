---
title: Meter Documentation

language_tabs: # must be one of https://git.io/vQNgJ
  - javascript

toc_footers:
- <a href='./index.html'>Meter Documentation</a>
- <hr>
- Contributing
- <a href='./index.html'>Contributing Home</a>
- <a href='./documentation-guidelines.html'>Documentation Guidelines</a>
- <a href='./api-doc-guidelines.html'>Writing API Docs</a>
- <a href='./tutorials-guidelines.html'>How to Create Tutorials</a>
- <a href='./article-guidelines.html'>What is an Article</a>
- <a href='./code-example-guidelines.html'>Instructions for Examples</a>
- <hr>
- <a href='../meterify.html'>API Documentation</a>
- <a href='../meterify.dapps.html'>DApp Tutorial</a>
- <a href='../examples/index.html'>Examples</a>
- <a href='../mining.html'>Mining Guide</a>
- <hr>  
- <a href='https://www.meter.io/claim-your-meter/'>Request Test Tokens</a>
- <a href='https://www.meter.io'>Meter.io</a>

search: true
---

# Tutorial Guidelines

The value of tutorials as an instructional tool cannot be underestimated. Tutorials help guide a reader through a sequence of instructional steps, including relevant and informative explanations, in a way that other types of content are not designed for.

Writing attention grabbing tutorials that provide a solution to a clearly identified problem or challenge is important for the Meter technical documentation. The objective is to explain how to accomplish a set of tasks that work towards developing the solution, and also why each step or instruction is important. Explanations should be brief, informative, and focused on the main topic.

This guide is provided to ensure writers are equipped to create clear and interesting Meter specific tutorials, for both [development](../meterify.daaps.html) and [non-development](../mining.html) purposes. It will outline some important features of tutorials, and include best practices, but is a work in progress. There is a lot that goes into tutorial writing, and as this guide further develops will become a more robust tutorial in itself.

[Audience](#audience)
[Structure](#structure)
[Use of Examples](#use-of-examples)

<a name="audience">

### Audience

Avoid promoting generic third-party tools, that don't add much value in a Meter context. For example, it may be safely assumed that the reader is already a developer familiar with code editors and syntax highlighting. However, something that is blockchain-centric, and can make the reader's job easier when it comes to the specifics of the Meter blockchain, it may be worthwhile suggesting. It might even be worth writing a full tutorial about how to use it in a Meter context. An example of this could be an IDE that is focused on `web3`, which would likely then be relevant for `meterify` as well.

<a name="structure">

### Structure

Tutorials have three main sections: an introduction, a body, and a conclusion.

The introduction should begin with a problem statement or an objective, and describe a proposed solution. It should be 2 or 3 paragraphs long. This does not include any table of contents, which should also be included in the same section, just before the tutorial body.

The body is where to include sub-headings representing the sequential steps of the tutorial. It might also include other sub-headings, such as those that provide links to further reading. These sub-headings should be arranged in sequence, starting off small, and then building up the knowledge necessary to understand the final product.

A concluding statement at the end should be one paragraph long. It should be a review of the tutorial, to help consolidate what the reader has learned, and insight into how the solution solves the original problem. The conclusion can also provide one or more links to further reading.

<a name="use-of-examples">

### Use of Examples

Tutorials address the need for better context than is typically possible with the API documentation alone. Building an example, showing each sequential modification, and explaining each step, is a great tutorial strategy. It helps to organize the overall flow of the tutorial, delivers the necessary context, and is an opportunity to provide insight into how each step fits into the overall objective.

Tutorials for developers will almost always focus on the use of `meterify`, and therefore should almost always correspond to a working [code example](code-example-guidelines.html). There may however be topics of interest to a developer that are less code related, or perhaps not specific to `meterify`, and therefore will not require any code example. One example might be a tutorial for using a development tool or framework that is compatible with `meterify` development. Relevant code snippets within the tutorial itself may suffice in that type of scenario, rather than including a corresponding example as well.

Keep the code blocks short, representing only the portions of code relevant to that step. Put a link to the full working example code somewhere at the start of the tutorial. This is convenient for the reader to see what the end result is going to look like before they start any further reading. And above all, make sure the example works.
