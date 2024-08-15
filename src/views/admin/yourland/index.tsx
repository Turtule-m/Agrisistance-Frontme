import {
	Flex, Text, Box, Progress, CircularProgress, CircularProgressLabel, FormHelperText, Slider, SliderTrack, SliderFilledTrack, SliderThumb, SliderMark,
	Tooltip,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import cropsData from './img/crops';
import land from '../../../assets/img/land/land';
import { Button } from '../../../common/Button/index'
import TotalSpent from '../default/components/TotalSpent';
interface RevenueItem {
	CropName: string;
	area: number;
	description: string;
	weight: string;
	price: number;
	img: string;
	progress: number;
}

const revenue: RevenueItem[] = [
	// Example data
	{ CropName: 'beans', area: 90, description: 'text that describes the crop', weight: '2000', price: 3000, img: 'beans', progress: 80 },
	{ CropName: 'rice', area: 30, description: 'text that describes the crop', weight: '200', price: 3100, img: 'rice', progress: 50 },
	{ CropName: 'groundnut', area: 40, description: 'text that describes the crop', weight: '2100', price: 3100, img: 'groundnut', progress: 50 },
	{ CropName: 'cashew', area: 10, description: 'text that describes the crop', weight: '10', price: 3100, img: 'cashew', progress: 50 },
];

interface SuggestionItem {
	text: string;
	link: string;
}
const Suggestions: SuggestionItem[] = [
	{ text: 'Reduce the pest invasion by raising pestesides levels, we recommend', link: '/dewadaw' }
]

interface Crops {
	[key: string]: string;
}

const crops: Crops = cropsData;

const city = 'Tissemsilt';
const country = 'Algeria';

// Define the revenue array with its type

// Define soil data
const soil = {
	oxygen: 20,
	azote: 15,
	potassium: 10,
	phosphorus: 8,
	humidity: 65,
	ph: 30,
};
const crop = {
	water_sufficient: 80,
	sunlight: 60,
	pestisides_level: 44,
	pest_invation: 77
}
const Yourland: React.FC = () => {
	const [activeSection, setActiveSection] = useState<string>('Predict Revenue');
	const [sliderValue, setSliderValue] = React.useState(50);
	const [showTooltip, setShowTooltip] = React.useState(false);
	const renderContent = () => {
		switch (activeSection) {
			case 'Predict Revenue':
				return (
					<Box>
						{revenue.length === 0 ? (
							<Flex direction='column' gap='40px'>
								<Text background='#fff' padding='20px' borderRadius='20px'>
									This Section provides you with the best crop recommendations according to your land parameters!
								</Text>
								<img src={cropsData.empty || '/default-empty-image.png'} alt="No data available" />
							</Flex>
						) : (
							<ul>
								{revenue.map((item, index) => (
									<li key={index}>
										<Flex direction='column' mb={4} background={'#fff'} padding={'20px'} borderRadius='20px'>
											<Flex align='center'>
												<img src={crops[item.img] || '/default-crop-image.png'} alt={item.CropName} style={{ width: '50px', height: 'auto', marginRight: '10px' }} />
												<Flex direction='column'>
													<Text fontWeight='bold'>{item.CropName}</Text>
													<Text color='grey' fontSize={'lg'}>{item.area} m<sup>2</sup></Text>
												</Flex>
												<Flex gap='20px' ml='auto'>
													<Text border='2px solid #218225' borderRadius='20px' padding='5px 10px'>{item.weight} $+</Text>
													<Text border='2px solid #218225' borderRadius='20px' padding='5px 10px'>{item.price} kg+</Text>
												</Flex>
											</Flex>
											<Text mt={1} color='grey' fontSize={'lg'}>{item.description}</Text>
											<Flex align='center' justify='space-between'>
												<Progress value={item.progress} size='xs' colorScheme='green' width='100%' mt={2} />
												<Text color='grey'>{item.progress}%</Text>
											</Flex>
										</Flex>
									</li>
								))}
							</ul>
						)}
					</Box>
				);
			case 'Soil maintenance':
				return (
					<Box>
						<Flex justify='space-around'>
							<Flex direction='column' align='center' gap='15px'>
								<CircularProgress color='#218225' value={soil.oxygen} size='90px' trackColor='#BCCCBF'>
									<CircularProgressLabel fontWeight='semibold'>{soil.oxygen}%</CircularProgressLabel>
								</CircularProgress>
								<Text fontWeight='bold'>oxygen</Text>
							</Flex>
							<Flex direction='column' align='center' gap='15px'>
								<CircularProgress color='#218225' value={soil.azote} size='90px' trackColor='#BCCCBF'>
									<CircularProgressLabel fontWeight='semibold'>{soil.azote}%</CircularProgressLabel>
								</CircularProgress>
								<Text fontWeight='bold'>azote</Text>
							</Flex>
							<Flex direction='column' align='center' gap='15px'>
								<CircularProgress color='#218225' value={soil.potassium} size='90px' trackColor='#BCCCBF'>
									<CircularProgressLabel fontWeight='semibold'>{soil.potassium}%</CircularProgressLabel>
								</CircularProgress>
								<Text fontWeight='bold'>potassium</Text>
							</Flex>
							<Flex direction='column' align='center' gap='15px'>
								<CircularProgress color='#218225' value={soil.phosphorus} size='90px' trackColor='#BCCCBF'>
									<CircularProgressLabel fontWeight='semibold'>{soil.phosphorus}%</CircularProgressLabel>
								</CircularProgress>
								<Text fontWeight='bold'>phosphorus</Text>
							</Flex>
							<Flex direction='column' align='center' gap='15px'>
								<CircularProgress color='#218225' value={soil.humidity} size='90px' trackColor='#BCCCBF'>
									<CircularProgressLabel fontWeight='semibold'>{soil.humidity}%</CircularProgressLabel>
								</CircularProgress>
								<Text fontWeight='bold'>humidity</Text>
							</Flex>
							<Flex direction='column' align='center' gap='15px'>
								<CircularProgress color='#218225' value={soil.ph} size='90px' trackColor='#BCCCBF'>
									<CircularProgressLabel fontWeight='semibold'>{soil.ph}%</CircularProgressLabel>
								</CircularProgress>
								<Text fontWeight='bold'>ph</Text>
							</Flex>
						</Flex>
						<Flex direction='column' align='center' gap='20px' padding='40px'>
							<Text textAlign='center' fontWeight='bold' fontSize='3xl'>Set Manually: Oxygen Level</Text>
							<Slider
								id='slider'
								defaultValue={50}
								min={0}
								max={100}
								colorScheme='green'
								onChange={(v) => setSliderValue(v)}
								onMouseEnter={() => setShowTooltip(true)}
								onMouseLeave={() => setShowTooltip(false)}
								width='400px'
							>
								<SliderMark value={25} mt='3' ml='-2.5' fontSize='sm'>
									25
								</SliderMark>
								<SliderMark value={50} mt='3' ml='-2.5' fontSize='sm'>
									50
								</SliderMark>
								<SliderMark value={75} mt='3' ml='-2.5' fontSize='sm'>
									75
								</SliderMark>
								<SliderTrack bg='green.200'>
									<SliderFilledTrack />
								</SliderTrack>
								<Tooltip
									hasArrow
									bg='green.400'
									color='white'
									placement='top'
									isOpen={showTooltip}
									label={`${sliderValue}%`}
								>
									<SliderThumb />
								</Tooltip>
							</Slider>
						</Flex>
						<Flex>
							<Flex background='#fff' width='100%' padding='20px' mt='40px' borderRadius='20px' direction='column'>
								<Flex gap='40px'>
									<Text fontWeight='semibold'>Suggested improvements</Text>
									{Suggestions.length === 0 ? (
										<Text color='#2ACC32' textAlign='end'>No new suggestions</Text>) :
										(
											<Text color='#FC0D0D'>{Suggestions.length} new suggestions</Text>
										)}

								</Flex>
								{Suggestions.length === 0 ? null : (
									<ul style={{
										padding: '20px'
									}}>
										{Suggestions.map((item, index) => (
											<li key={index}>
												<Flex gap='10px'>
													<Text>{item.text}</Text>
													<a href={item.link}><Text color={'#00A6CB'}>Brand</Text></a>
												</Flex>
											</li>))}
									</ul>
								)
								}
							</Flex>
						</Flex>
					</Box>
				);
			case 'Crop maintenance':
				return (
					<Box>
						<Flex justify='space-around'>
							<Flex direction='column' align='center' gap='15px'>
								<CircularProgress color='#218225' value={crop.water_sufficient} size='90px' trackColor='#BCCCBF'>
									<CircularProgressLabel fontWeight='semibold'>{crop.water_sufficient}%</CircularProgressLabel>
								</CircularProgress>
								<Text fontWeight='bold'>Water sufficient</Text>
							</Flex>
							<Flex direction='column' align='center' gap='15px'>
								<CircularProgress color='#218225' value={crop.sunlight} size='90px' trackColor='#BCCCBF'>
									<CircularProgressLabel fontWeight='semibold'>{crop.sunlight}%</CircularProgressLabel>
								</CircularProgress>
								<Text fontWeight='bold'>Sunlight</Text>
							</Flex>
							<Flex direction='column' align='center' gap='15px'>
								<CircularProgress color='#218225' value={crop.pestisides_level} size='90px' trackColor='#BCCCBF'>
									<CircularProgressLabel fontWeight='semibold'>{crop.pestisides_level}%</CircularProgressLabel>
								</CircularProgress>
								<Text fontWeight='bold'>pestesides levels</Text>
							</Flex>
							<Flex direction='column' align='center' gap='15px'>
								<CircularProgress color='#218225' value={crop.pest_invation} size='90px' trackColor='#BCCCBF'>
									<CircularProgressLabel fontWeight='semibold'>{crop.pest_invation}%</CircularProgressLabel>
								</CircularProgress>
								<Text fontWeight='bold'>pest invasion</Text>
							</Flex>
						</Flex>
						<Flex>
							<Flex background='#fff' width='100%' padding='20px' mt='40px' borderRadius='20px' direction='column'>
								<Flex gap='40px'>
									<Text fontWeight='semibold'>Suggested improvements</Text>
									{Suggestions.length === 0 ? (
										<Text color='#2ACC32' textAlign='end'>No new suggestions</Text>) :
										(
											<Text color='#FC0D0D'>{Suggestions.length} new suggestions</Text>
										)}

								</Flex>
								{Suggestions.length === 0 ? null : (
									<ul style={{
										padding: '20px'
									}}>
										{Suggestions.map((item, index) => (
											<li key={index}>
												<Flex gap='10px'>
													<Text>{item.text}</Text>
													<a href={item.link}><Text color={'#00A6CB'}>Brand</Text></a>
												</Flex>
											</li>))}
									</ul>
								)
								}
							</Flex>
						</Flex>
					</Box>
				);
			case 'Land statistics':
				return (
					<Box>
						<Flex justify='space-around'>
							<Flex direction='column' align='center' gap='15px'>
								<CircularProgress color='#218225' value={crop.water_sufficient} size='90px' trackColor='#BCCCBF'>
									<CircularProgressLabel fontWeight='semibold'>{crop.water_sufficient}%</CircularProgressLabel>
								</CircularProgress>
								<Text fontWeight='bold'>Water sufficient</Text>
							</Flex>
							<Flex direction='column' align='center' gap='15px'>
								<CircularProgress color='#218225' value={crop.sunlight} size='90px' trackColor='#BCCCBF'>
									<CircularProgressLabel fontWeight='semibold'>{crop.sunlight}%</CircularProgressLabel>
								</CircularProgress>
								<Text fontWeight='bold'>Sunlight</Text>
							</Flex>
							<Flex direction='column' align='center' gap='15px'>
								<CircularProgress color='#218225' value={crop.pestisides_level} size='90px' trackColor='#BCCCBF'>
									<CircularProgressLabel fontWeight='semibold'>{crop.pestisides_level}%</CircularProgressLabel>
								</CircularProgress>
								<Text fontWeight='bold'>pestesides levels</Text>
							</Flex>
							<Flex direction='column' align='center' gap='15px'>
								<CircularProgress color='#218225' value={crop.pest_invation} size='90px' trackColor='#BCCCBF'>
									<CircularProgressLabel fontWeight='semibold'>{crop.pest_invation}%</CircularProgressLabel>
								</CircularProgress>
								<Text fontWeight='bold'>pest invasion</Text>
							</Flex>
						</Flex>
						<Flex height='3px' width='100%' bgColor='grey' margin='40px 0px'></Flex>
						<Flex direction='column' align='center' gap='40px'>
							<Text fontWeight='semibold' fontSize='4xl'>Your current land</Text>
							<img src={land.land1} alt="" width='70%' />
						</Flex>
					</Box>
				);
			case 'Finance management':
				return (
					<Box>
						<Flex padding='40px'>
							<Flex width='50%' direction='column' justify='center' height='100%' align='center' gap='40px'>
								<button className='btn-view'>View your business plan</button>
								<Text textAlign='start' fontSize='3xl' fontWeight='semibold' width='100%' margin='20px 20px 0px 20px'>Your budget</Text>
								<Flex width='100%' background='#F1F1F1' borderRadius='16px' padding='20px' margin='0px 20px 20px 20px'>
									<Text>10 000 ETB</Text>
								</Flex>
								<Button>Modify</Button>
							</Flex>
							<Flex padding='2	0px'>
								<TotalSpent />
							</Flex>
						</Flex>
					</Box>
				);
			default:
				return <Text>Select a section</Text>;
		}
	};

	return (
		<Flex direction="column" p={4}>
			<Text mb={4} fontSize='3xl' fontWeight='semibold'>{city}, {country}</Text>
			<Flex gap='40px' mb={4}>
				{['Predict Revenue', 'Soil maintenance', 'Crop maintenance', 'Land statistics', 'Finance management'].map(section => (
					<Text
						key={section}
						onClick={() => setActiveSection(section)}
						cursor="pointer"
						color={activeSection === section ? 'black' : 'gray.500'}
						textDecoration={activeSection === section ? 'underline' : 'none'}
						mb={2}
					>
						{section}
					</Text>
				))}
			</Flex>
			<Box>
				{renderContent()}
			</Box>
		</Flex>
	);
}

export default Yourland;
