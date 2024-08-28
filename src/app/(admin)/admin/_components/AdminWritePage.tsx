"use client";

import { useAuth } from "@/hooks/auth/useAuth";
import { useId } from "react";

const inputStyle = "w-[180px] border border-gray-300 rounded-md p-2";

function AdminWritePage() {
    const { user } = useAuth();

    const titleId = useId();
    const descriptionId = useId();
    const keywords1Id = useId();
    const keywords2Id = useId();
    const keywords3Id = useId();
    const linkId = useId();
    const github_linkId = useId();
    const started_atId = useId();
    const ended_atId = useId();
    const featuresId = useId();
    const stacksId = useId();
    const decisionsId = useId();
    const troublesId = useId();

    if (!user) {
        return <div>로그인 후 이용해주세요.</div>;
    }

    return (
        <section>
            <form className="flex flex-col gap-2">
                <div>
                    <label htmlFor={titleId}>Title</label>
                    <input type="text" name="title" className={inputStyle} id={titleId} />
                </div>
                <div>
                    <label htmlFor={descriptionId}>Description</label>
                    <input type="text" name="description" className={inputStyle} id={descriptionId} />
                </div>
                <div>
                    <label htmlFor="keywords1">Keywords</label>
                    <input type="text" name="keywords1" className={inputStyle} id={keywords1Id} />
                    <input type="text" name="keywords2" className={inputStyle} id={keywords2Id} />
                    <input type="text" name="keywords3" className={inputStyle} id={keywords3Id} />
                </div>
                <div>
                    <label htmlFor={linkId}>link</label>
                    <input type="text" name="link" className={inputStyle} id={linkId} />
                    <label htmlFor={github_linkId}>Github link</label>
                    <input type="text" name="github_link" className={inputStyle} id={github_linkId} />
                </div>
                <div>
                    <label htmlFor={started_atId}>Started at</label>
                    <input type="date" name="started_at" className={inputStyle} id={started_atId} />
                    <label htmlFor={ended_atId}>Ended at</label>
                    <input type="date" name="ended_at" className={inputStyle} id={ended_atId} />
                </div>
                <div>
                    <label htmlFor={featuresId}>Features</label>
                    <input type="text" name="features" className={inputStyle} id={featuresId} />
                </div>
                <div>
                    <label htmlFor={stacksId}>Stacks</label>
                    <input type="text" name="stacks" className={inputStyle} id={stacksId} />
                </div>
                <div>
                    <label htmlFor={decisionsId}>Decisions</label>
                    <input type="text" name="decisions" className={inputStyle} id={decisionsId} />
                </div>
                <div>
                    <label htmlFor={troublesId}>Troubles</label>
                    <input type="text" name="troubles" className={inputStyle} id={troublesId} />
                </div>
                <button type="submit">Submit</button>
            </form>
        </section>
    );
}

export default AdminWritePage;
