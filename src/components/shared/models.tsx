import { carModels } from "@/mock/car-models";
import { Car } from "@/types/car.type";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import ModelCard from "../base/model-card";
import {layout} from "@/constant/layout";

import { useTheme } from "@/hooks/use-theme";
interface ModelsProps {
    selectedSlug: string;
}

const shuffleArray = (array: Car[])=> [...array].sort(()=> Math.random() - 0.5); 

export default function Models({ selectedSlug }: ModelsProps) {

    const {colorScheme} = useTheme();
    const colors = layout.colors[colorScheme];
    const styles = getStyles(colors);


    const [cars, setCars] = useState(shuffleArray(carModels));
    const [refreshing, setRefreshing] = useState(false);

    const getBrandCars = () =>
        selectedSlug
        ? carModels.filter((car: Car) => car.brandSlug === selectedSlug)
        : carModels;

    useEffect(() => {
        setCars(shuffleArray(getBrandCars()));
    }, [selectedSlug]);
    

    const onRefresh = async()=>{
        setRefreshing(true)
        await new Promise(resolve => setTimeout(resolve, 1000))
        setCars(shuffleArray(getBrandCars()));
        setRefreshing(false)
    }


    return (
        <FlatList
            data={cars}
            renderItem={({ item }) => <ModelCard key={item.id} model={item} />}
            refreshing={refreshing}
            onRefresh={onRefresh}
            contentContainerStyle={styles.modelsContainer}

            style={styles.list}
        />
    );
}


const getStyles = (colors: typeof layout.colors.light) => 
    StyleSheet.create({
        list: {
            backgroundColor: colors.background,
        },

        modelsContainer: {
            gap: 12
        },
    });

