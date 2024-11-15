import { PieChart, Pie, Cell } from 'recharts';
import { green, red, gray } from 'tailwindcss/colors';
import { renderPercentage } from '../../lib';

function GasTarget({ gasUsedFromTarget, gasUsedExceededTarget }) {
  const cssClass = gasUsedExceededTarget ? 'text-green-600' : 'text-red-600';
  const sign = gasUsedExceededTarget ? '+' : '-';
  const gasUsedPerc = Math.round((gasUsedFromTarget * 100) / 2);
  const pieCenter = 50;
  const pieValue = gasUsedExceededTarget ? pieCenter + gasUsedPerc : pieCenter - gasUsedPerc;
  const pieData = [{ value: pieValue }, { value: 100 - pieValue }];
  const pieColors = [gasUsedExceededTarget ? green[500] : red[500], gray[200]];

  return (
    <div className={`${cssClass} ml-2 inline-block -mt-10`}>
      <PieChart width={75} height={54} className="inline-block">
        <Pie
          data={pieData}
          cx={30}
          cy={50}
          startAngle={180}
          endAngle={0}
          innerRadius={15}
          outerRadius={25}
          paddingAngle={0}
          isAnimationActive={true}
          animationDuration={500}
          dataKey="value"
        >
          {pieData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
          ))}
        </Pie>
      </PieChart>
      {sign}
      {renderPercentage({ value: gasUsedFromTarget, maximumFractionDigits: 0 })} Gas Target
    </div>
  );
}

export default GasTarget;
