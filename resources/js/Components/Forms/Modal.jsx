import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react"

export function Modal({trigger, title, onSubmit, role = 'dialog', children, ...rest}) {
    return <Dialog.Root role={role} {...rest}>
        <Dialog.Trigger asChild>
            {trigger}
        </Dialog.Trigger>
        <Portal>
            <Dialog.Backdrop />
            <form onSubmit={onSubmit ? onSubmit : (e) => e.preventDefault()}>
            <Dialog.Positioner>
                <Dialog.Content>
                    <Dialog.Header>
                        <Dialog.Title>{title}</Dialog.Title>
                    </Dialog.Header>
                    <Dialog.Body>
                        {children}
                    </Dialog.Body>
                    {onSubmit ? <Dialog.Footer>
                        <Dialog.ActionTrigger asChild>
                            <Button variant="outline">Cancel</Button>
                        </Dialog.ActionTrigger>
                        <Button type="submit" colorPalette={role === 'alertdialog' ? 'red' : 'bg.solid'}>Save</Button>
                    </Dialog.Footer> : ''}
                    <Dialog.CloseTrigger asChild>
                        <CloseButton size="sm" />
                    </Dialog.CloseTrigger>
                </Dialog.Content>
            </Dialog.Positioner>
            </form>
        </Portal>
    </Dialog.Root>
}
