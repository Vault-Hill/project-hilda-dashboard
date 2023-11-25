import { useState } from 'react';
import { Comment } from 'react-loader-spinner';
import useApi from '../api';
import { ReportDetails, Session } from '../types';
import ReportDetailsModal from './modals/ReportDetails';

type Props = {
  data: { nextPageKey?: string; reports: Session[] };
};

const Report: React.FC<Props> = ({ data: { reports, nextPageKey } }) => {
  const [show, setShow] = useState<boolean>(false);
  const [session, setSession] = useState<ReportDetails | null>(null);
  const [data, setData] = useState<Session[]>(reports);

  console.log(typeof nextPageKey);

  const { getReports } = useApi();
  const getMore = async () => {
    const data = await getReports({ nextPageKey });
    setData((prev) => [...prev, ...data.reports]);
  };

  const columns = ['Session started', 'Session duration', 'No. messages', 'Escalation', ''];

  const Active = () => (
    <Comment
      visible={true}
      height='25'
      width='25'
      ariaLabel='comment-loading'
      wrapperStyle={{}}
      wrapperClass='comment-wrapper'
      color='#fff'
      backgroundColor='#F4442E'
    />
  );

  const handleViewReport = (sessionId: string) => {
    const report = data.find((report) => report.id === sessionId);
    if (report) {
      setShow(true);
      setSession({
        ...report,
        sessionDuration: report.sessionDuration
          ? `${Math.floor(report.sessionDuration / 60000)}m`
          : 'ongoing',
        sessionStartedAt: Intl.DateTimeFormat('en-US', {
          month: 'numeric',
          day: 'numeric',
          year: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          hour12: true,
        }).format(report.sessionStartedAt),
        escalation: report.escalation ? 'Yes' : 'No',
      });
    }
  };

  return (
    <div className='mt-8 flow-root'>
      <ReportDetailsModal show={show} setShow={setShow} data={session} />

      <div className='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
        <div className='inline-block min-w-full py-2 align-middle'>
          <table className='min-w-full divide-y divide-gray-300'>
            <thead>
              <tr>
                {columns.map((column) => (
                  <th
                    key={column}
                    scope='col'
                    className='text-center py-3.5 pl-4 pr-3 text-sm font-semibold text-gray-900 dark:text-neutral-300 sm:pl-6 lg:pl-8'
                  >
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-200 bg-white dark:bg-black text-gray-600 dark:text-neutral-200'>
              {data.map((report) => (
                <tr key={report.id}>
                  <td className='whitespace-nowrap text-center py-4 pl-4 pr-3 text-sm font-medium sm:pl-6 lg:pl-8'>
                    {Intl.DateTimeFormat('en-US', {
                      month: 'numeric',
                      day: 'numeric',
                      year: 'numeric',
                      hour: 'numeric',
                      minute: 'numeric',
                      hour12: true,
                    }).format(report.sessionStartedAt)}
                  </td>
                  <td className='whitespace-nowrap text-center px-3 py-4 text-sm'>
                    {report.sessionDuration ? (
                      `${Math.floor(report.sessionDuration / 60000)}m`
                    ) : (
                      <span className='flex justify-center'>
                        <Active />
                        <span className='ml-2'>ongoing</span>
                      </span>
                    )}
                  </td>
                  <td className='whitespace-nowrap text-center px-3 py-4 text-sm'>
                    {report.totalMessages}
                  </td>
                  <td className='whitespace-nowrap text-center px-3 py-4 text-sm'>
                    {report.escalation ? 'Yes' : 'No'}
                  </td>
                  <td className='relative whitespace-nowrap text-center py-4 pl-3 pr-4  text-sm font-medium sm:pr-6 lg:pr-8'>
                    <button
                      onClick={() => handleViewReport(report.id)}
                      className='hover:text-gray-600'
                    >
                      View Report
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* pagination */}
      {nextPageKey && (
        <div className='flex justify-center mt-10'>
          <button
            onClick={getMore}
            className='px-3 py-2 bg-[#FF7E7E] rounded-md w-fit text-[14px] font-semibold text-black'
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default Report;
