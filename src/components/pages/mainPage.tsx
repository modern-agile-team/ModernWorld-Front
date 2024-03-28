import Link from 'next/link';

export default function mainPage() {
    return (
        <div>
            <Link href="/loginPage">
                <img src="https://wang0514.s3.ap-northeast-2.amazonaws.com/page/power.png"></img>
            </Link>
        </div>
    );
}
