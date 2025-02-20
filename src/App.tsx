import { cn } from '@/utils/tailwind.ts'
import Form from './components/Form'
import {FormBuilder} from './components/FormBuilder'
import DynamicForm from './components/DynamixForm'

export function App() {
	return (
		<div className={cn('min-h-screen bg-gray-50')}>
			<div className={cn('container mx-auto py-8')}>
				<div className={cn('grid grid-cols-1 lg:grid-cols-2 gap-8')}>
					<div className={cn('bg-white rounded-lg shadow-md')}>
						<FormBuilder />
					</div>
					<div className={cn('bg-white rounded-lg shadow-md p-4')}>
						<h2 className="text-xl font-bold mb-4">Preview Form</h2>
						<DynamicForm />
					</div>
				</div>
			</div>
		</div>
	)
}
