import { ViewComponent } from "@/types/types";
import { ItemProvider } from "./ItemProvider";

export function PanelContent({ viewData }: { viewData: ViewComponent[] }) {
    return (
        <div>
            {viewData.map((data, index) => (
                <div key={index}>{ItemProvider(data)}</div>
            ))}
        </div>
    );
}
