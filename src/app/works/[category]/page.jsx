import WorksPage from '../WorksPage'

export default function WorksCategory({ params }) {
    return <WorksPage category={params.category} />
}