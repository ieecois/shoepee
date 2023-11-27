import ApexCharts from 'apexcharts';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const ChartRevenue = ({ orderList }) => {
  const [selectedTimeline, setSelectedTimeline] = useState('all');
  const options = {
    chart: {
      id: 'area-datetime',
      type: 'area',
      height: 350,
      zoom: {
        autoScaleYaxis: true,
      },
    },
    annotations: {
      yaxis: [
        {
          y: 30,
          borderColor: '#999',
          label: {
            show: true,
            text: 'Day',
            style: {
              color: '#fff',
              background: '#00E396',
            },
          },
        },
      ],
      xaxis: [
        {
          x: new Date('31 Dev 2023').getTime(),
          borderColor: '#999',
          yAxisIndex: 0,
          label: {
            show: true,
            text: 'Number',
            style: {
              color: '#fff',
              background: '#775DD0',
            },
          },
        },
      ],
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 0,
      style: 'hollow',
    },
    xaxis: {
      type: 'datetime',
      min: new Date('01 Nov 2023').getTime(),
      tickAmount: 6,
    },
    tooltip: {
      x: {
        format: 'dd MMM yyyy',
      },
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        stops: [0, 100],
      },
    },
  };

  // Function to format date to YYYY/MM/DD
  const formatDate = (date) => {
    const d = new Date(date);
    return `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(
      2,
      '0'
    )}/${String(d.getDate()).padStart(2, '0')}`;
  };

  const aggregateData = (orders, keyExtractor) => {
    const salesMap = new Map();
    orders.forEach((order) => {
      if (order.orderCompeledAt) {
        const date = formatDate(order.orderCompeledAt);
        const currentTotal = salesMap.get(date) || 0;
        salesMap.set(date, currentTotal + keyExtractor(order));
      }
    });
    return Array.from(salesMap, ([date, total]) => ({
      x: new Date(date).getTime(),
      y: total,
    })).sort((a, b) => a.x - b.x);
  };

  const [series, setSeries] = useState([]);

  useEffect(() => {
    if (orderList && orderList.length > 0) {
      const productsData = aggregateData(orderList, (order) =>
        order.orderItem.reduce((sum, item) => sum + item.productQuantity, 0)
      );
      const salesData = aggregateData(orderList, (order) => order.orderAmt);
      console.log(productsData);
      console.log(salesData);
      setSeries([
        { name: 'Total Products Sold', data: productsData },
        { name: 'Total Sales', data: salesData },
      ]);
    }
  }, [orderList]);
  const getDataRange = () => {
    let minDate = new Date();
    let maxDate = new Date(0); // A very old date

    orderList.forEach((order) => {
      if (order.orderCompeledAt) {
        const date = new Date(order.orderCompeledAt);
        if (date < minDate) minDate = date;
        if (date > maxDate) maxDate = date;
      }
    });

    return { minDate, maxDate };
  };

  // Function to update the chart data
  const updateData = (timeline) => {
    const { minDate, maxDate } = getDataRange();
    let newMinDate, newMaxDate;
    const currentDate = new Date();
    switch (timeline) {
      case 'one_month':
        newMinDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          1
        );
        newMaxDate = currentDate; // Or use the end of the current month
        break;
      case 'one_year':
        newMinDate = new Date(
          maxDate.getFullYear() - 1,
          maxDate.getMonth(),
          maxDate.getDate()
        );
        newMaxDate = maxDate;
        break;
      case 'all':
        newMinDate = minDate;
        newMaxDate = maxDate;
        break;
      default:
        newMinDate = minDate;
        newMaxDate = maxDate;
    }
    
    ApexCharts.exec('area-datetime', 'zoomX', newMinDate, newMaxDate);
    
  };
  

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
      <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        <div className="flex w-full flex-wrap gap-3 sm:gap-5"></div>
        <div className="flex w-full max-w-45 justify-end">
          <div className="inline-flex items-center rounded-md bg-whiter p-1.5 dark:bg-meta-4">
            <button
              onClick={() => updateData('one_month')}
              className={`rounded py-1 px-3 text-xs font-medium text-black ${
                selectedTimeline === 'one_month' ? 'bg-white shadow-card' : ''
              } hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark`}
            >
              1M
            </button>

            <button
              onClick={() => updateData('one_year')}
              className={`rounded py-1 px-3 text-xs font-medium text-black ${
                selectedTimeline === 'one_year' ? 'bg-white shadow-card' : ''
              } hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark`}
            >
              1Y
            </button>

            <button
              onClick={() => updateData('all')}
              className={`rounded py-1 px-3 text-xs font-medium text-black ${
                selectedTimeline === 'all' ? 'bg-white shadow-card' : ''
              } hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark`}
            >
              ALL
            </button>
          </div>
        </div>
      </div>
      <div>
        <div id="chartOne" className="-ml-5">
          <ReactApexChart
            options={options}
            series={series}
            type="area"
            height={350}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartRevenue;
