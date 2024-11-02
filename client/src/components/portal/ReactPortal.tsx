import { useState, useLayoutEffect } from "react";
import { createPortal } from "react-dom"; // Default props value.

type ReactPortalProps = {
    children: React.ReactNode;
    wrapperId: string;
};

// Render component.
const ReactPortal = ({
    children,
    wrapperId = "react-portal",
}: ReactPortalProps) => {
    // Manage state of portal-wrapper.
    const [wrapper, setWrapper] = useState<HTMLElement | null>(null);

    useLayoutEffect(() => {
        // Find the container-element (if exist).
        let element = document.getElementById(wrapperId); // Bool flag whether container-element has been created.
        let created = false;
        if (!element) {
            created = true;
            const wrapper = document.createElement("div");
            wrapper.setAttribute("id", wrapperId);
            document.body.appendChild(wrapper);
            element = wrapper;
        } // Set wrapper state.
        setWrapper(element); // Cleanup effect.
        return () => {
            if (created && element?.parentNode) {
                element.parentNode.removeChild(element);
            }
        };
    }, [wrapperId]); // Return null on initial rendering.
    if (wrapper === null) return null; // Return portal-wrapper component.
    return createPortal(children, wrapper);
};

export default ReactPortal;
