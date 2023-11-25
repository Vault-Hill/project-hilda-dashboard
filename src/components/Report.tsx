import { useState } from 'react';
import { ReportDetails, Session } from '../types';
import ReportDetailsModal from './modals/ReportDetails';

type Props = {
  data: { nextPageKey: string | null; reports: Session[] };
};

const Report: React.FC<Props> = ({ data: { reports } }) => {
  const [show, setShow] = useState<boolean>(false);
  const [session, setSession] = useState<ReportDetails | null>(null);

  const columns = ['Session started', 'Session duration', 'No. messages', 'Escalation', ''];

  const handleViewReport = (sessionId: string) => {
    const report = reports.find((report) => report.id === sessionId);
    if (report) {
      setShow(true);
      setSession({
        ...report,
        sessionDuration: `${Math.floor(report.sessionDuration / 60000)}m`,
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
                    className='text-center py-3.5 pl-4 pr-3 text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8'
                  >
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-200 bg-white'>
              {reports.map((report) => (
                <tr key={report.id}>
                  <td className='whitespace-nowrap text-center py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8'>
                    {Intl.DateTimeFormat('en-US', {
                      month: 'numeric',
                      day: 'numeric',
                      year: 'numeric',
                      hour: 'numeric',
                      minute: 'numeric',
                      hour12: true,
                    }).format(report.sessionStartedAt)}
                  </td>
                  <td className='whitespace-nowrap text-center px-3 py-4 text-sm text-gray-500'>
                    {`${Math.floor(report.sessionDuration / 60000)}m`}
                  </td>
                  <td className='whitespace-nowrap text-center px-3 py-4 text-sm text-gray-500'>
                    {report.totalMessages}
                  </td>
                  <td className='whitespace-nowrap text-center px-3 py-4 text-sm text-gray-500'>
                    {report.escalation ? 'Yes' : 'No'}
                  </td>
                  <td className='relative whitespace-nowrap text-center py-4 pl-3 pr-4  text-sm font-medium sm:pr-6 lg:pr-8'>
                    <button
                      onClick={() => handleViewReport(report.id)}
                      className='text-gray-500 hover:text-gray-600'
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
    </div>
  );
};

export default Report;
