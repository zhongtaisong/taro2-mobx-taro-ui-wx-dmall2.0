import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { observer } from '@tarojs/mobx'
import { AtIcon } from 'taro-ui'
import { toJS } from 'mobx';
// 公共组件
import { AtList, CommentList } from '@com';
// less样式
import './index.less';

// 商品评价
@observer
class Index extends Taro.Component {

    // 商品评价 - 模态框
    toggleModal = () => {
      Taro.navigateTo({
        url: `/pages/common/commentModal/index?id=${this.props.pid}`
      })
    }

    render() {
        const { commentList=[] } = this.props;
        return (
            <View className='ProductsDetail_Comment'>
                <AtList 
                  atListItem={[
                    { title: '评价', arrow: 'right', extraText: `共 ${commentList.length} 条`, onClick: commentList.length ? this.toggleModal : null }
                  ]}
                  className='comment_list'
                />
                {
                    commentList.length ? (
                        <View className='comment_content'>
                            <CommentList {...this.props} 
                              list={toJS(commentList.slice(0, 2))}
                            />
                            {
                                commentList.length > 2 ? (
                                    <View className='all_comment' 
                                      onClick={this.toggleModal}
                                    >
                                        查看全部评价
                                        <AtIcon value='chevron-right' size={18} />
                                    </View>
                                ) : ''
                            }
                        </View>
                    ) : (
                        <View className='no_comment'>暂无评价</View>
                    )
                }
            </View>
        );
    }
}

export default Index;