# @ouroboros/browser

[![npm version](https://img.shields.io/npm/v/@ouroboros/browser.svg)](https://www.npmjs.com/package/@ouroboros/browser) ![MIT License](https://img.shields.io/npm/l/@ouroboros/browser.svg)

A library of classes to manage functionality in browsers.

## Installation

```bash
npm install @ouroboros/browser
```

## clipboard

Import clipboard into your code

```javascript
import clipboard from '@ouroboros/browser/clipboard';
```

or

```javascript
import { clipboard } from '@ouroboros/browser';
```

copy()

## cookies

Import Cookies into your code

```javascript
import cookies from '@ouroboros/browser/cookies';
```

or

```javascript
import { cookies } from '@ouroboros/browser';
```

get(), remove(), set()

## hash

Import hash into your code

```javascript
import hash from '@ouroboros/browser/hash';
```

or

```javascript
import { hash } from '@ouroboros/browser';
```

get(), set(), subscribe(), unsubscribe()

## network

Import network into your code

```javascript
import network from '@ouroboros/browser/network';
```

or

```javascript
import { network } from '@ouroboros/browser';
```

default (Subscribe)

## pageVisibility

Import pageVisibility into your code

```javascript
import pageVisibility from '@ouroboros/browser/pageVisibility';
```

or

```javascript
import { pageVisibility } from '@ouroboros/browser';
```

default (Subscribe)

## safeLocalStorage

Import safeLocalStorage into your code

```javascript
import safeLocalStorage from '@ouroboros/browser/safeLocalStorage';
```

or

```javascript
import { safeLocalStorage } from '@ouroboros/browser';
```

bool(), json(), string()

## size

Import size into your code

```javascript
import size from '@ouroboros/browser/size';
```

or

```javascript
import { size } from '@ouroboros/browser';
```

size (Subscribe), compare(), greaterThan(), lessThan()