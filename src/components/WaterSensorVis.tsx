import * as d3 from 'd3';
import { LegacyRef, useEffect, useRef } from 'react';
import useDimensions from '../hooks/useDimensions';

interface IProps {
  data: { id: string; average: number }[];
  yLabel: string;
  color: string;
  hoverColor: string;
}

function WaterSensorVis(props: IProps) {
  const chartRef = useRef<SVGSVGElement>();
  const tooltipRef = useRef<HTMLDivElement>();
  const chartContainerRef = useRef<HTMLDivElement>();
  // @ts-expect-error D3 doesn't like a ref
  const chartSize = useDimensions(chartContainerRef);

  const { data } = props;
  const adjuster = 0.25; // Start the y axis at slightly less that the lowest value

  // Set dimensions
  const margin = { top: 20, right: 30, bottom: 40, left: 70 };

  useEffect(() => {
    // Append SVG
    const svg = d3
      // @ts-expect-error D3 not agreeing with the use of a ref
      .select(chartRef.current)
      .append('svg')
      .attr('preserveAspectRatio', 'none')
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Grab tooltip
    // @ts-expect-error Unresolved typing issue
    const tooltip = d3.select(tooltipRef.current);

    const renderViz = () => {
      // Get the new width and height
      const width =
        // @ts-expect-error D3 not agreeing with the use of a ref
        parseInt(d3.select(chartRef.current).style('width')) -
        margin.left -
        margin.right;
      const height =
        // @ts-expect-error D3 not agreeing with the use of a ref
        parseInt(d3.select(chartRef.current).style('height')) -
        margin.top -
        margin.bottom;

      // x axis scale
      const x = d3
        .scaleBand()
        .domain(data.map((d) => d.id))
        .range([0, width])
        .padding(0.1);

      // y axis scale
      const y = d3
        .scaleLinear()
        // @ts-expect-error Unresolved typing issue
        .domain([
          d3.min(data, (d) => d.average - adjuster),
          d3.max(data, (d) => d.average),
        ])
        .nice()
        .range([height, 0]);

      // append x axis
      // @ts-expect-error D3 not agreeing with the use of a ref
      d3.select(chartRef.current).selectAll('.x-axis').remove();
      svg
        .append('g')
        .attr('class', 'x-axis')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x).tickFormat((d) => `${d.substring(0, 5)}...`))
        .selectAll('text')
        .attr('class', 'axis-label')
        .attr('style', 'font-size: 12px;')
        .style('text-anchor', 'end')
        .attr('dx', '1.5em')
        .attr('dy', '.5em');

      // x axis label
      // @ts-expect-error D3 not agreeing with the use of a ref
      d3.select(chartRef.current).selectAll('.x-axis-label').remove();
      svg
        .append('text')
        .attr('class', 'x-axis-label')
        .attr('text-anchor', 'end')
        .attr('style', 'font-size: 11px;')
        .attr('x', width / 2 - 40)
        .attr('y', height + margin.bottom - 10)
        .text('sensor identifier');

      // append y axis
      // @ts-expect-error D3 not agreeing with the use of a ref
      d3.select(chartRef.current).selectAll('.y-axis').remove();
      svg
        .append('g')
        .attr('class', 'y-axis')
        .attr('style', 'font-size: 11px;')
        .call(d3.axisLeft(y))
        .selectAll('text')
        .attr('class', 'axis-label');

      // y axis label
      // @ts-expect-error D3 not agreeing with the use of a ref
      d3.select(chartRef.current).selectAll('.y-axis-label').remove();
      svg
        .append('text')
        .attr('class', 'y-axis-label')
        .attr('style', 'font-size: 11px;')
        .attr('text-anchor', 'end')
        .attr('transform', 'rotate(-90)')
        .attr('x', 10)
        .attr('y', -margin.left + 20)
        .text(props.yLabel);

      const colorScale = [
        '#0466c8',
        '#0353a4',
        '#023e7d',
        '#002855',
        '#001845',
        '#001233',
      ];

      // Append bars
      // @ts-expect-error D3 not agreeing with the use of a ref
      d3.select(chartRef.current).selectAll('.bar').remove();
      svg
        .selectAll('.bar')
        .data(data)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        // @ts-expect-error Unresolved typing issue
        .attr('x', (d) => x(d.id))
        .attr('width', x.bandwidth())
        .attr('y', height)
        .attr('height', 0)
        .attr('fill', (_d, i) => colorScale[i])
        .on('mouseover', function (event, d) {
          d3.select(this).attr('opacity', 0.7);
          tooltip.transition().duration(200).style('opacity', 0.9);
          tooltip
            .html(`ID: ${d.id}<br>Average: ${d.average}`)
            .style('left', event.pageX + 5 + 'px')
            .style('top', event.pageY - 28 + 'px');
        })
        .on('mouseout', function () {
          d3.select(this).attr('opacity', 1);
          tooltip.transition().duration(500).style('opacity', 0);
        })
        .transition()
        .duration(1000)
        .attr('y', (d) => y(d.average))
        .attr('height', (d) => height - y(d.average));
    };

    renderViz();

    window.addEventListener('resize', renderViz);

    return () => {
      window.removeEventListener('resize', renderViz);
    };
  }, [
    data,
    margin.bottom,
    margin.left,
    margin.right,
    margin.top,
    props.color,
    props.hoverColor,
    props.yLabel,
  ]);

  return (
    <>
      <div
        id="tooltip"
        className="tooltip"
        ref={tooltipRef as LegacyRef<HTMLDivElement>}
      ></div>
      <div
        ref={chartContainerRef as LegacyRef<HTMLDivElement>}
        className="w-full rounded border border-slate-300"
      >
        <div className="rounded rounded-b-none bg-slate-500 px-2 py-1 text-sm text-white">
          <h3>Average river {props.yLabel}</h3>
        </div>
        <div className="p-2 text-slate-400">
          <svg
            ref={chartRef as LegacyRef<SVGSVGElement>}
            id="barchart"
            width={chartSize.width}
            height={250}
          />
          <p className="text-[11px] text-slate-400">
            Mouseover the bars to see sensor information
          </p>
        </div>
      </div>
    </>
  );
}

export default WaterSensorVis;
