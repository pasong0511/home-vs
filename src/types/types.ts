export interface IFolder {
    id: string;
    folderName: string;
    create: string;
}

export interface ViewComponent {
    viewType?: string;
    display?: boolean;

    data?: any;
    config: {
        label?: string;
        placeholder?: string;
        subPlaceholder?: string;
        className?: string;
        buttonList?: Button[];
    };
}

export interface ButtonGroupProps {
    buttonList: Button[];
}

export interface Button {
    order: number;
    value: string;
    label: string;
}
