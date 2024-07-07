export default function withConfigToProps(component: Function) {
    return ({
        display,
        config,
    }: {
        display?: boolean;
        config: { [key: string]: unknown };
    }) => {
        return display ? component({ ...config }) : null;
    };
}
