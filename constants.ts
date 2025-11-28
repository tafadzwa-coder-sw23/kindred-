import { Availability, Category, Opportunity, UserProfile } from './types';

export const MOCK_USER: UserProfile = {
  name: "Nyasha Moyo",
  interests: [Category.Environment, Category.Community, Category.Education],
  availability: [Availability.Weekends, Availability.Flexible],
  skills: ["Shona", "English", "Community Organizing", "Agriculture"],
  bio: "Passionate about sustainable development in Zimbabwe. I grew up in Mutare and now live in Harare. I want to use my weekends to support local conservation efforts and youth education."
};

export const OPPORTUNITIES: Opportunity[] = [
  {
    id: '1',
    title: 'Mukuvisi Woodlands Conservation',
    organization: {
      id: 'org1',
      name: 'Harare Greening Project',
      avatar: 'https://picsum.photos/id/10/100/100', // Nature
      description: 'Preserving our indigenous woodlands in the heart of the city.'
    },
    category: Category.Environment,
    location: 'Mukuvisi Woodlands, Harare',
    date: 'Every Saturday, 8 AM - 11 AM',
    availability: Availability.Weekends,
    description: 'Join us for invasive species removal and trail maintenance. Help protect one of Harare’s most vital green lungs and wildlife sanctuaries. Tools and refreshments provided.',
    skills: ['Physical Labor', 'Conservation', 'Teamwork'],
    imageUrl: 'https://picsum.photos/id/116/800/600', // Nature/Grass
    spotsTotal: 25,
    spotsFilled: 12
  },
  {
    id: '2',
    title: 'O-Level Math Tutor',
    organization: {
      id: 'org2',
      name: 'Educate Zimbabwe',
      avatar: 'https://picsum.photos/id/20/100/100', // Book/Paper
      description: 'Empowering rural and urban youth through academic support.'
    },
    category: Category.Education,
    location: 'Highfield Library, Harare',
    date: 'Tuesdays & Thursdays, 3 PM - 5 PM',
    availability: Availability.Weekdays,
    description: 'Tutor Form 3 and 4 students preparing for their ZIMSEC exams. We urgently need help with Mathematics and Science subjects to boost pass rates.',
    skills: ['Mathematics', 'Science', 'Teaching', 'Shona (Optional)'],
    imageUrl: 'https://picsum.photos/id/367/800/600', // Books
    spotsTotal: 10,
    spotsFilled: 3
  },
  {
    id: '3',
    title: 'Community Garden Coordinator',
    organization: {
      id: 'org3',
      name: 'Bulawayo Food Security Network',
      avatar: 'https://picsum.photos/id/75/100/100', // Plant
      description: 'Fighting hunger through sustainable urban farming.'
    },
    category: Category.Community,
    location: 'Nkulumane, Bulawayo',
    date: 'Sundays, 9 AM - 1 PM',
    availability: Availability.Weekends,
    description: 'Assist in managing a community nutritional garden. Teach locals about drought-resistant crops (maize, sorghum) and drip irrigation techniques.',
    skills: ['Agriculture', 'Leadership', 'Ndebele (Preferred)'],
    imageUrl: 'https://picsum.photos/id/292/800/600', // Vegetables
    spotsTotal: 8,
    spotsFilled: 6
  },
  {
    id: '4',
    title: 'Zambezi River Cleanup',
    organization: {
      id: 'org4',
      name: 'Save the Zambezi',
      avatar: 'https://picsum.photos/id/400/100/100', // Water
      description: 'Protecting our vital water sources and wildlife.'
    },
    category: Category.Environment,
    location: 'Victoria Falls River Bank',
    date: 'Monthly (Next: Oct 15th)',
    availability: Availability.Weekends,
    description: 'Help remove plastic waste from the banks of the Zambezi River to protect elephants, hippos, and birdlife. Transport provided from Victoria Falls town center.',
    skills: ['Environmental Awareness', 'Swimming (Basic)', 'Fitness'],
    imageUrl: 'https://picsum.photos/id/972/800/600', // Water/River
    spotsTotal: 40,
    spotsFilled: 15
  },
  {
    id: '5',
    title: 'Gogo & Sekuru Support Visit',
    organization: {
      id: 'org5',
      name: 'Ubuntu Senior Care',
      avatar: 'https://picsum.photos/id/500/100/100',
      description: 'Bringing companionship to our elders.'
    },
    category: Category.Health,
    location: 'Chitungwiza',
    date: 'Flexible (2 hours/week)',
    availability: Availability.Flexible,
    description: 'Spend time with the elderly at the local care home. Share stories, read newspapers, or help with small errands. Embracing the spirit of Ubuntu.',
    skills: ['Listening', 'Empathy', 'Respect'],
    imageUrl: 'https://picsum.photos/id/838/800/600', // People
    spotsTotal: 15,
    spotsFilled: 5
  },
  {
    id: '6',
    title: 'Anti-Poaching Data Analyst',
    organization: {
      id: 'org6',
      name: 'Wildlife Guardians Africa',
      avatar: 'https://picsum.photos/id/600/100/100',
      description: 'Using technology to save our rhinos and elephants.'
    },
    category: Category.AnimalWelfare,
    location: 'Remote / Hybrid (Harare)',
    date: 'Flexible',
    availability: Availability.Flexible,
    description: 'Help us analyze patrol data from Mana Pools and Hwange National Park. Look for patterns to assist rangers in deploying resources effectively.',
    skills: ['Data Analysis', 'Computer Literacy', 'Conservation Interest'],
    imageUrl: 'https://picsum.photos/id/164/800/600', // Nature/Savanna-ish
    spotsTotal: 3,
    spotsFilled: 1
  },
  {
    id: '7',
    title: 'Shona Sculpture Workshop Assistant',
    organization: {
      id: 'org7',
      name: 'Domboshava Arts Centre',
      avatar: 'https://picsum.photos/id/700/100/100',
      description: 'Promoting Zimbabwean heritage through stone.',
    },
    category: Category.Arts,
    location: 'Domboshava',
    date: 'Saturdays, 10 AM - 3 PM',
    availability: Availability.Weekends,
    description: 'Assist master sculptors during tourist workshops. Help manage tools, welcome guests, and explain the history of Shona stone sculpture.',
    skills: ['Artistic', 'Hospitality', 'Cultural Knowledge'],
    imageUrl: 'https://picsum.photos/id/703/800/600', // Stone/Texture
    spotsTotal: 5,
    spotsFilled: 2
  }
];