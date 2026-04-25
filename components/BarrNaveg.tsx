import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, View } from 'react-native';

interface BarrNavegProps {
    /** Plataforma en la que se renderiza. Reservado para variantes de estilo futuras. */
    platform?: 'web' | 'movil';
}

type TabId = 'home' | 'catalog' | 'cart' | 'profile';

const tabs: { id: TabId; icon: string; route: string }[] = [
    { id: 'home',    icon: 'home',   route: '/'         },
    { id: 'catalog', icon: 'apps',   route: '/catalogo' },
    { id: 'cart',    icon: 'cart',   route: '/cart'     },
    { id: 'profile', icon: 'person', route: '/login'    },
];

const BarrNaveg = ({ platform = 'movil' }: BarrNavegProps) => {
    const [activeTab, setActiveTab] = useState<TabId>('home');

    return (
        <View
            className="absolute bottom-4 self-center w-[90%] rounded-full flex-row justify-around items-center py-1/2 border-[1.5px] border-orange-500"
            style={{
                backgroundColor: '#FED20F',
                elevation: 8,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 5,
            }}
        >
            {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                const iconName = isActive ? tab.icon : `${tab.icon}-outline`;

                return (
                    <Pressable
                        key={tab.id}
                        onPress={() => {
                            setActiveTab(tab.id);
                            router.push(tab.route as any);
                        }}
                        className={`p-3 rounded-full ${isActive ? 'bg-orange-100' : 'bg-transparent'}`}
                    >
                        <Ionicons
                            name={iconName as any}
                            size={26}
                            color={isActive ? '#f97316' : '#000000'}
                        />
                    </Pressable>
                );
            })}
        </View>
    );
};

export default BarrNaveg;

