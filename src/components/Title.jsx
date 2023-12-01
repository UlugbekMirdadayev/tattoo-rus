import Link from 'next/link'

export default function Title({ title, allLink, action }) {
    return (
        <div className="row align-items-center" style={{ marginBottom: 30 }} onClick={action}>
            <div className="col-12 col-md-9">
                <h1 className="h2">{title}</h1>
            </div>
            {allLink && (
                <div className="col-12 col-md-3 d-none d-md-block text-align-right">
                    <Link href={allLink} className="link-all">
                        Смотреть все
                    </Link>
                </div>
            )}
        </div>
    )
}
