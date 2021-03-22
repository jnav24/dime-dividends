import { PageProps } from '@inertiajs/inertia';

declare namespace CustomInertia {
    type AuthUser = {
        created_at: string,
        email: string,
        email_verified_at: null | number,
        id: number,
        name: string,
        updated_at: string,
    }

	interface CustomProps extends PageProps {
		errors: Record<string, string>;
		flash: Record<string, string>;
		status: string;
		user: AuthUser,
	}
}

export = CustomInertia;
