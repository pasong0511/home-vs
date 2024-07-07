export default function withCombined(components: Function[] = []) {
    return ({
        display,
        config,
    }: {
        display?: boolean;
        config: {
            combined?: { [key: string]: unknown }[];
            [key: string]: unknown;
        };
    }) => {
        return display
            ? components.map((component, idx) =>
                  component({ ...config?.combined?.[idx] })
              )
            : null;
    };
}
