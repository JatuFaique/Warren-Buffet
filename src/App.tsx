import { cn } from '@/utils/tailwind.ts'

export function App() {
	return (
		<div className={cn('flex min-h-screen items-center justify-center')}>
			<h1 className={cn('font-medium text-red-700')}>Hello World</h1>
		</div>
	)
}
