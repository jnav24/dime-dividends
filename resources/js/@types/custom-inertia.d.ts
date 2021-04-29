import { PageProps } from '@inertiajs/inertia';

declare namespace CustomInertia {
	type AuthUser = {
		created_at: string;
		email: string;
		email_verified_at: null | number;
		id: number;
		name: string;
		updated_at: string;
		mfa_enabled: boolean;
	};

	interface CustomProps extends PageProps {
		app_url: string;
		errors: Record<string, string>;
		flash: Record<string, string>;
		status: string;
		request: Record<string, string>;
		reset_password_token: string;
		user: AuthUser;
	}
}

export = CustomInertia;
