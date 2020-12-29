import { PageProps } from '@inertiajs/inertia';

declare namespace CustomInertia {
	interface CustomProps extends PageProps {
		csrf_token: string;
		errors: Record<string, string>;
	}
}

export = CustomInertia;
