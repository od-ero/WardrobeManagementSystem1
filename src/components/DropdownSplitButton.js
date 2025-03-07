import React from 'react'
import { Menu, Transition } from '@headlessui/react'

const Dropdown = ({
    align = 'right',
    width = 48,
    contentClasses = 'py-1',
    trigger,
    children,
}) => {
    let alignmentClasses

    switch (width) {
        case '48':
            width = 'w-48'
            break
    }

    switch (align) {
        case 'left':
            alignmentClasses = 'origin-top-left left-0'
            break
        case 'top':
            alignmentClasses = 'origin-top'
            break
        case 'right':
        default:
            alignmentClasses = 'origin-top-right right-0'
            break
    }

    return (
        <Menu as="div" >
            {({ open }) => (
                <>
                    <Menu.Button as={React.Fragment} >{trigger}</Menu.Button>
    <Transition
        show={open}
        enter="transition ease-out duration-200"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95" >
        <div
            className={`absolute mt-2 ${width}  shadow-lg ${alignmentClasses}`} >
            <Menu.Items
                className={`rounded-md focus:outline-none ring-1 ring-black bg-white border-2 border-gray-50 ring-opacity-5 ${contentClasses}`}
                static>
                {children}
            </Menu.Items>
        </div>
    </Transition>

                </>
            )}
        </Menu>
    )
}

export default Dropdown
