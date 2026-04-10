import React from 'react';
import { Pressable, PressableProps, Text } from 'react-native';


interface Props extends PressableProps {
    children: string;
    color?: 'primary' | 'secondary' | 'tertiary' | 'quaternary';
    variant?: 'contained' | 'text-only';
    className?: string;
}

const CustomButton = ({ children, color = 'primary', variant, onPress, onLongPress, className }: Props) => {
    const btnColor = {
        primary: 'bg-primary',
        secondary: 'bg-secondary',
        tertiary: 'bg-tertiary',
        quaternary: 'bg-quaternary',
    }[color]

    const btnTextColor = {
        primary: 'text-primary-500',
        secondary: 'text-secondary-500',
        tertiary: 'text-tertiary-500',
        quaternary: 'text-quaternary-950',
    }[color]

    if (variant === 'text-only') {
        return (
            <Pressable className={`p-1 ${className}`} onPress={onPress} onLongPress={onLongPress}>
                <Text className={`${btnTextColor} text-center`}>{children}</Text>
            </Pressable>
        )
    }

    return (
        <Pressable className={`p-1 rounded-md ${btnColor} ${className}`} onPress={onPress} onLongPress={onLongPress}>
            <Text className='text-quaternary-950 text-center'>{children}</Text>
        </Pressable>
    )
}

export default CustomButton