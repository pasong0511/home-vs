import { ViewComponent } from "@/types/types";
import { itemProvider } from "./itemProvider";

export function PanelContent({ viewData }: { viewData: ViewComponent[] }) {
    return (
        <div>
            {viewData.map((data, index) => (
                <div key={index}>{itemProvider(data)}</div>
            ))}
        </div>
    );
}
