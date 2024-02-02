import { db } from "@/db";
import { Chip } from "@nextui-org/react";
import Link from "next/link";
import paths from "@/paths";

export default async function TopicLists() {
    const result = await db.topic.findMany();
    
    const renderedTopics = result.map((topic)=>{
        return(
            <div key={topic.id}>
                <Link href={paths.topicShowPath(topic.slug)}>
                    <Chip color="warning" variant="shadow">
                        {topic.slug}
                    </Chip>
                </Link>
            </div>
        )
    })
    
    return <div className="flex flex-row flex-wrap gap-2">
        {renderedTopics}
    </div>
 
}