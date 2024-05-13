import { Job } from "@/models/Jobs";

type Props = {
  item: Job;
};

export default function JobCard({ item }: Props) {
  const { id, job_title, company_str } = item;
  return (
    <div key={id} className="border-2 border-red-400">
      <strong>
        <h1>{job_title}</h1>
      </strong>
      <h2>{company_str}</h2>
    </div>
  );
}
