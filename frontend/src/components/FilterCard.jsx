import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/productSlice'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';


const fitlerData = [
    {
        fitlerType: "Gender",
        array: ["Man", "Women", "Boys", "Girls", "Baby", "Other"]
    },
    {
        fitlerType: "Brand",
        array: ["Zara", "Jockey", "FLYING MACHINE", "Nike"]
    },
    {
        fitlerType: "Price",
        array: ["0-5000", "5000-100000", "1lakh to 5lakh"]
    },
]

const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState('');
    const dispatch = useDispatch();
    const changeHandler = (value) => {
        setSelectedValue(value);
    }
    useEffect(() => {
        dispatch(setSearchedQuery(selectedValue));
    }, [selectedValue]);
    return (
        <Popover>
            <PopoverTrigger asChild>
                <h1>filter : <FontAwesomeIcon icon={faFilter} className="text-gray-600 cursor-pointer" /></h1>
            </PopoverTrigger>
            <PopoverContent className="w-80">
                <RadioGroup value={selectedValue} onValueChange={changeHandler}>
                    {
                        fitlerData.map((data, index) => (
                            <div>
                                <h1 className='font-bold text-lg'>{data.fitlerType}</h1>
                                {
                                    data.array.map((item, idx) => {
                                        const itemId = `id${index}-${idx}`
                                        return (
                                            <div className='flex items-center space-x-2 my-2'>
                                                <RadioGroupItem value={item} id={itemId} />
                                                <Label htmlFor={itemId}>{item}</Label>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        ))
                    }
                </RadioGroup>
            </PopoverContent>
        </Popover>


    )
}

export default FilterCard