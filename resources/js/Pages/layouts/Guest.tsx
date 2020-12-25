import React from 'react';

// @ts-ignore
import logoImage from '../../../assets/logo_1.png';
// @ts-ignore
import onboardImage from '../../../assets/onboard_bg_1-1.jpg';

type GuestProps = {
	children: React.ReactNode;
};

const styles = {
    bgImage: {
        background: `url(${onboardImage}) no-repeat center center fixed`,
        backgroundSize: 'cover',
    },
};

const Guest: React.FC<GuestProps> = ({ children }) => {
	return (
		<div className="min-h-screen flex flex-col justify-center items-center">
			<div className="absolute top-0 left-0 w-full h-full bg-gray-100 sm:bg-primary sm:bg-opacity-75 z-20" />
			<div style={styles.bgImage} className="absolute left-0 top-0 w-full h-full z-10" />

			<div className="relative z-30 w-full sm:w-100 mt-6 px-4 sm:px-0 pt-4 sm:bg-white sm:rounded-lg sm:shadow-md overflow-hidden text-left">
				<div className="flex flex-row justify-center mb-4">
					<div className="overflow-hidden h-16 w-16">
						<img
							src={logoImage}
							alt="Dime Dividend Tracker"
							style={{ maxWidth: '12rem' }}
							className="crisp h-full w-64"
						/>
					</div>
				</div>

				{children}
			</div>
		</div>
	);
};

export default Guest;
