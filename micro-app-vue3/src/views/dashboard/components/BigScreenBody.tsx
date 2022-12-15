import { defineComponent, ref, nextTick, onMounted } from 'vue'
import BorderBox from './BorderBox'
import ECCharts from '@/components/EcCharts/EcCharts'
import { getWaterBallBaseOptions } from '../options/waterballBaseOptions'
import * as echarts from 'echarts'

import '../style/bigScreen.scss'

const BigScreenBody = defineComponent({
  // props: {},

  setup(props, ctx) {
    const setItemStyle = (startColor: string, endColor: string) => {
      return {
        color: new echarts.graphic.LinearGradient(
          0,
          0,
          0,
          1,
          [
            {
              offset: 0,
              color: startColor
            },
            {
              offset: 1,
              color: endColor
            }
          ],
          false
        )
      }
    }

    const waterBallData = ref<
      {
        options: ReturnType<typeof getWaterBallBaseOptions> | null
        title: string
        value: number
      }[]
    >(
      new Array(4).fill('0').map(() => {
        return {
          options: null,
          title: '',
          value: 0
        }
      })
    )
    onMounted(() => {
      nextTick(() => {
        const waterBallBasicData = [
          {
            title: 'title 1',
            value: 0.96,
            shadowColor: '#FFF220',
            itemStyle: setItemStyle('#FFF220', '#F95508')
          },
          {
            title: 'title 2',
            value: 0.66,
            shadowColor: '#1BA2F9',
            itemStyle: setItemStyle('#2BDAFF', '#078FF7')
          },
          {
            title: 'title 3',
            value: 0.76,
            shadowColor: '#2DF09F',
            itemStyle: setItemStyle('#2DF09F', '#0EB1E5')
          },
          {
            title: 'title 4',
            value: 0.86,
            shadowColor: '#EF07F7',
            itemStyle: setItemStyle('#945FFF', '#EF07F7')
          }
        ]
        waterBallData.value = waterBallBasicData.map((item) => {
          const data = [
            {
              value: item.value,
              itemStyle: item.itemStyle
            }
          ]
          return {
            options: getWaterBallBaseOptions(item.title, item.shadowColor, data),
            title: item.title,
            value: item.value
          }
        })
      })
    })

    return () => (
      <div class="big-screen-body">
        <div class="left">
          <BorderBox title="水球">
            <div style="height: 300px; width: 300px; display: flex; flex-wrap: wrap;">
              {waterBallData.value.map((item) => {
                return (
                  <div style="height: 50%; width:50%;">
                    <ECCharts options={item.options}></ECCharts>
                  </div>
                )
              })}
            </div>
          </BorderBox>
        </div>
        <div class="right"></div>
      </div>
    )
  }
})

export default BigScreenBody
