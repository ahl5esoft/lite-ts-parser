# ![Version](https://img.shields.io/badge/version-1.1.2-green.svg)

## install

```
npm install lite-ts-parser
```

## use

### default `ParserType`

```
import { ParserFactory, ParserType } from 'lite-ts-parser';

const parserFactory = new ParserFactory(enumFactory, {}, {});
const parser = parserFactory.build(ParserType.bool);
// parser is ToBoolParser
```

### alias

```
import { ParserFactory, ParserType } from 'lite-ts-parser';

const parserFactory = new ParserFactory(enumFactory, {}, {
    // alias to parser type
    boolean: ParserType.bool,
});
const parser = parserFactory.build('boolean');
// parser is ToBoolParser
```

### custom

```
import { IParser, ParserFactory, ParserType } from 'lite-ts-parser';

class CustomParser implements IParser {
    public async parse(v: any) {
        return 'c_' + v;
    }
}

const parserFactory = new ParserFactory(enumFactory, {
    custom: new CustomParser(),
}, {});
const parser = await parserFactory.build('custom').parse('1');
// parser is CustomParser
```