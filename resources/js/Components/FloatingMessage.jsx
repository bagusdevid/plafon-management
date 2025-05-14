import { Alert } from "@chakra-ui/react";

export default function FloatingMessage({ show, status, children }) {
    return (
        <div
            className={`fixed w-full left-0 py-3 z-[9999] ${
                show ? "top-0 opacity-100" : "-top-16 opacity-0"
            } duration-500`}
        >
            <div className="max-w-96 mx-auto">
                <Alert.Root status={status}>
                    <Alert.Indicator />
                    <Alert.Content>
                        <Alert.Title>
                            {children}
                        </Alert.Title>
                    </Alert.Content>
                </Alert.Root>
            </div>
        </div>
    );
}
