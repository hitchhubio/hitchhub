export type FallbackProps = {
  obj: unknown;
  key: string | string[];
  keyArray: string[];
};

export type NotFoundProps = {
  message: string;
  obj: unknown;
  key: string | string[];
  keyArray: string[];
};

export function get({
  obj,
  key,
  fallback,
  notfound,
  index,
  undef,
}: {
  obj: Record<string, unknown>;
  key: string | string[];
  fallback?: (props: FallbackProps) => unknown;
  notfound?: (props: NotFoundProps) => void;
  index?: number;
  undef?: undefined;
}) {
  if (!obj) {
    throw new Error('No object provided.');
  }

  if (!key) {
    throw new Error('No key provided.');
  }

  const keyArray = Array.isArray(key) ? key : key.split('.');
  let currentObj: any = obj;

  for (index = 0; index < keyArray.length; index++) {
    if (currentObj && currentObj.hasOwnProperty(keyArray[index])) {
      currentObj = currentObj[keyArray[index]];
      continue;
    }

    if (notfound) {
      notfound({
        message: `No property '${keyArray[index]}' found on object at ${keyArray
          .slice(0, index)
          .join('.')}.`,
        obj,
        key,
        keyArray,
      });
    }

    currentObj = undef;
  }

  return currentObj === undef
    ? fallback
      ? fallback({ obj, key, keyArray })
      : undef
    : currentObj;
}
