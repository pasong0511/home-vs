import { ViewComponent } from "@/types/types";
import { containerProvider } from "./containerProvider";

export function ContentComponent({ viewData }: { viewData: ViewComponent[] }) {
    return (
        <div>
            {viewData.map((data, index) => (
                <div key={index}>{containerProvider(data)}</div>
            ))}
        </div>
    );
}
