import { PageProps } from '@inertiajs/inertia';

declare namespace CustomInertia {
	interface CustomProps extends PageProps {
		errors: Record<string, string>;
	}
}

export = CustomInertia;
