type SubPageProps = {
  title: string
  description: string
}

export const SubPage = ({ title, description }: SubPageProps) => (
  <div className="text-white space-y-8 max-w-4xl text-center">
    <h1 className="text-4xl font-bold text-purple-400">{title}</h1>
    <p className="text-xl text-gray-300">{description}</p>
    <p className="text-gray-500">More content coming soon... 🚧</p>
  </div>
)

