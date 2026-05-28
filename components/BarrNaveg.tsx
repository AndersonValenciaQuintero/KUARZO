import { Ionicons } from '@expo/vector-icons';
import { router, usePathname } from 'expo-router';
import React from 'react';
import { Pressable, View } from 'react-native';

interface BarrNavegProps {
    /** Plataforma en la que se renderiza. Reservado para variantes de estilo futuras. */
    platform?: 'web' | 'movil';
}

type TabId = 'catalog' | 'cart' | 'profile';

const tabs: { id: TabId; icon: string; route: string }[] = [
    { id: 'catalog', icon: 'apps', route: '/catalogo' },
    { id: 'cart', icon: 'cart', route: '/cart' },
    { id: 'profile', icon: 'person', route: '/login' },
];

const BarrNaveg = ({ platform = 'movil' }: BarrNavegProps) => {
    const pathname = usePathname();

    let activeTab: TabId = 'catalog';
    if (pathname === '/cart') {
        activeTab = 'cart';
    } else if (pathname === '/login' || pathname === '/register') {
        activeTab = 'profile';
    }

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

