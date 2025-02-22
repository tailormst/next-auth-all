"use client"

export default function Attendance() {
    const googleSheetUrl = ("https://docs.google.com/spreadsheets/u/0/?tgif=d");
    const excelTemplateUrl = ("https://docs.google.com/spreadsheets/d/15kegR6G5u7UrXAdkO8gdT5HOvlGzgfvs/edit?usp=sharing&ouid=112981363678595697342&rtpof=true&sd=true");

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-3xl font-bold mb-8">Attendance Sheet</h1>
            <div className="bg-white shadow-md rounded my-6 p-6">
                <p className="text-lg mb-4">To mark attendance, please go to the Google Sheet and update the data for each student.</p>
                <div className="mt-4 flex space-x-4">
                    <a
                        href={googleSheetUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Open Google Sheet
                    </a>
                </div>
                <div className="mt-4 flex space-x-4">
                    <a
                        href={excelTemplateUrl}
                        download
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Download Excel Template
                    </a>
                </div>
            </div>
        </div>
    )
}