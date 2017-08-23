/**
 * Created by sailengsi on 2017/5/11.
 */

import {
  ListData,
  FormData,
  DialogInfo,
  Echarts,
  DragDialog,
  CurrentOrder,
  TradeRule,
  LpQuote,
  LpOrder
} from 'cps/';

console.log('CurrentOrder', CurrentOrder);

export default {
  ListData,
  FormData,
  DialogInfo,
  DragDialog,
  LpQuote,
  LpOrder,
  AddPosition: CurrentOrder.AddPosition,
  DeletePosition: CurrentOrder.DeletePosition,
  TraderuleDia: TradeRule.TradeRuleDia,
  EchartsBarDefault: Echarts.Bar.Default,
  EchartsBarHorizontal: Echarts.Bar.Horizontal,
  EchartsLineDefault: Echarts.Line.Default,
  EchartsPieDefault: Echarts.Pie.Default
};