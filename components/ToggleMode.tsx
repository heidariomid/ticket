'use client';

import {useTheme} from 'next-themes';
import {useEffect, useState} from 'react';
import {Button} from './ui/button';
import {Moon, Sun} from 'lucide-react';

const ToggleMode = () => {
	const {theme, setTheme} = useTheme();
	const [mounted, setMounted] = useState(false);
	useEffect(() => setMounted(true), []);
	const dark = theme === 'dark';
	if (!mounted) {
		return <Button variant='ghost' size='icon' disabled></Button>;
	}

	const handler = () => setTheme(dark ? 'light' : 'dark');
	return (
		<Button variant='ghost' size='icon' onClick={handler}>
			{dark ? (
				<Sun className='hover:cursor-pointer hover:text-primary' />
			) : (
				<Moon className='hover:cursor-pointer hover:text-primary' />
			)}
		</Button>
	);
};

export default ToggleMode;
