export default function useUtils() {
    const ucFirst = (val: string): string =>
        val.charAt(0).toUpperCase() + val.slice(1);

    const arrayColumn = <S extends keyof R, R extends Record<string, string>>(
        val: S,
        arr: Array<R>
    ): Array<R[S]> => {
        return arr
            .map((obj: R) => obj[val] ?? null)
            .filter((value: R[S]) => value);
    };

    const camelCase = (value: string): string => {
        const delimList: string[] = ['_', '-'];
        let result = value;

        delimList.forEach((delim: string) => {
            if (result.includes(delim)) {
                const list: string[] = value.split(delim);

                const camel = list.map((word: string, index: number) => {
                    if (index) {
                        word = ucFirst(word);
                    }

                    return word;
                });

                result = camel.join('');
            }
        });

        return result;
    };

    const toTitleCase = (value: string, casing = '-'): string => {
        return value
            .split(casing)
            .map(word => ucFirst(word))
            .join(' ');
    };

    const sortObject = <T extends Record<string, any>>(obj: T) => {
        const result = {} as T;
        const keys: Array<keyof T> = Object.keys(obj);
        keys.sort().forEach(key => (result[key] = obj[key]));
        return result;
    };

    return { arrayColumn, camelCase, toTitleCase, sortObject, ucFirst };
}
