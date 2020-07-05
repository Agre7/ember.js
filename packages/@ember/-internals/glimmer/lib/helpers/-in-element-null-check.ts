import { assert } from '@ember/debug';
import { DEBUG } from '@glimmer/env';
import { Helper, VMArguments } from '@glimmer/interfaces';
import { PathReference } from '@glimmer/reference';

let helper: Helper;

if (DEBUG) {
  class InElementNullCheckReference implements PathReference {
    constructor(private inner: PathReference) {}

    value(): unknown {
      let value = this.inner.value();

      assert(
        'You cannot pass a null or undefined destination element to in-element',
        value !== null && value !== undefined
      );

      return value;
    }

    get(key: string): PathReference {
      return this.inner.get(key);
    }
  }

  helper = (args: VMArguments) => new InElementNullCheckReference(args.positional.at(0));
} else {
  helper = (args: VMArguments) => args.positional.at(0);
}

export default helper;
