# Wikipedia Game Improvement Proposal

Author: Kevan Parang

## Abstract

This document proposes improvements to the Wikipedia first search algorithm, including the use of a heuristic, parallelization, and caching.

## Description

### Use of a Heuristic

Instead of blindly searching through links, we could use a heuristic to guide the search. For example, we could prioritize links that contain words similar to the target page's title. This would require a library for natural language processing, such as NLTK or spaCy, to compare word similarities.

### Parallelization

We could speed up the search by crawling multiple pages at once. This would require a library for parallel processing, such as multiprocessing in Python.

### Caching

To avoid redundant work, we could cache the results of previous searches. This would require a database or similar data structure to store the results.

## Pseudocode

```
function find_path(start_page, finish_page):
    create empty queue Q
    create empty set V (visited pages)
    create empty dictionary P (paths)
    add start_page to Q
    add start_page to V
    P[start_page] = [start_page]

    while Q is not empty:
        current_page = dequeue from Q
        if current_page is finish_page:
            return P[current_page]
        for link in get_links(current_page):
            if link is not in V:
                add link to Q
                add link to V
                P[link] = P[current_page] + [link]

    return null
```
