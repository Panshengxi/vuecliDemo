<template>
  <div class="hello">
    <section class="content">
      <!--  -->
      <h3>
        <!-- 搜索待选区 -->
        <a-input-search
          compact
          class="_fl"
          style="width:200px; margin-right:10px"
          placeholder="按工号、姓名、部门搜索"
          @search="searchAwait"
          v-model="searchAwaitVal"
        >
        </a-input-search>
        <a-select default-value="1" style="width: 100px" @change="handleChange">
          <a-select-option value="1">
            按列表
          </a-select-option>
          <a-select-option value="2">
            按目录树
          </a-select-option>
        </a-select>
        <!-- 搜索已选区 -->
        <a-input-search
          compact
          class="_fr"
          style="width:calc(100% - 320px)"
          placeholder="按工号、姓名、部门搜索"
          @search="searchSelected"
          v-model="searchSelectedVal"
        >
        </a-input-search>
      </h3>
      <div class="content_main">
        <!-- 待选区 -->
        <section class="await_select_part _fl">
          <a-table
            :columns="columns"
            :data-source="data"
            rowKey="key"
            v-if="isShowList"
            :rowClassName="setRowClassName"
            bordered
          >
            <template slot="name" slot-scope="text">
              {{ text }}
            </template>
            <template slot="select" slot-scope="text, record">
              <a-checkbox
                v-model="record.checked"
                @change="onChange($event, record)"
              />
            </template>
          </a-table>

          <!-- 目录树 -->
          <!-- :default-selected-keys="[]" -->
          <a-menu
            v-else
            :open-keys.sync="openKeys"
            mode="inline"
            @click="handleClick"
            style="position:relative;text-align:left"
          >
            <a-checkbox
              class="checkbox_all"
              :indeterminate="indeterminate"
              :checked="checkAll"
              @change="onCheckAllChange"
            />
            <a-sub-menu title="全公司">
              <a-sub-menu v-for="(b, idx) in treeTitle" :key="idx">
                <span slot="title">
                  <!-- <a-icon type="plus" />
                <a-icon type="minus" /> -->

                  <a-checkbox
                    style="margin-right:10px"
                    :checked="b.checked"
                    :indeterminate="b.indeterminate"
                    @click.stop="() => {}"
                    @change="depChange($event, b)"
                  />
                  <span>{{ b.title }}</span></span
                >
                <a-menu-item v-for="item in treeData[b.title]" :key="item.key">
                  <a-checkbox
                    v-model="item.checked"
                    @change="onChange($event, item)"
                  />
                  <span :class="{ actived: item.highlight }">
                    {{ item.name }}</span
                  >
                </a-menu-item>
              </a-sub-menu>
            </a-sub-menu>
          </a-menu>
        </section>
        <!-- 已选区 -->
        <section class="selected_part _fr">
          <ul>
            <li
              :class="{ actived: b.actived }"
              v-for="b in selectedList"
              :key="b.key"
            >
              <span class="_fl"> {{ b.jobNumber }}-{{ b.name }}</span>
              <span> {{ b.department }}</span>
              <a-icon
                class="_fr"
                style="cursor: pointer;color:#fb3da1"
                @click="clearOneRecord(b)"
                type="close"
              />
            </li>
          </ul>
        </section>
      </div>
      <a-button @click="getSelectedData" class="_fr">取选择结果</a-button>
    </section>
  </div>
</template>

<script>
const columns = [
  {
    title: '选择',
    dataIndex: 'select',
    scopedSlots: { customRender: 'select' }
  },
  {
    title: '工号',
    dataIndex: 'jobNumber'
  },
  {
    title: '姓名',
    dataIndex: 'name',
    scopedSlots: { customRender: 'name' }
  },

  {
    title: '部门',
    dataIndex: 'department'
  }
]
const data = [
  {
    jobNumber: '001',
    name: '张三',
    department: '财务',
    key: '1'
  },
  {
    jobNumber: '002',
    name: '李四',
    department: '研发',
    key: '2'
  },
  {
    jobNumber: '004',
    name: '李二',
    department: '研发',
    key: '4'
  },
  {
    jobNumber: '003',
    name: '王五',
    department: '销售',
    key: '3'
  }
]

export default {
  name: 'Search',
  props: {
    msg: String
  },
  data () {
    return {
      searchAwaitVal: '',
      searchSelectedVal: '',
      columns,
      data,
      selectedList: [],
      // 目录树
      openKeys: [],
      treeData: {
        财务: [],
        研发: [],
        销售: []
      },
      treeTitle: [
        {
          title: '财务'
        },
        {
          title: '研发'
        },
        {
          title: '销售'
        }
      ],
      isShowList: true,
      indeterminate: false,
      checkAll: false
    }
  },
  created () {
    this.loadData()
  },
  methods: {
    loadData () {
      this.treeTitle.map(
        item => ((item.checked = false), (item.indeterminate = false))
      )
      this.data.map(item => {
        item.checked = false
        const arr = this.treeData[item.department]
        if (arr.length > 0) {
          arr.filter(b => b.jobNumber == item.jobNumber).length == 0 &&
            arr.push(item)
        } else {
          arr.push(item)
        }
      })
      this.update()
    },
    reg (a, b) {
      return b == '' ? false : a.indexOf(b) > -1
    },
    // 搜索待选区
    searchAwait () {
      this.search(this.data, this.searchAwaitVal, '0')
      this.update()
    },
    setRowClassName (record) {
      return record.highlight ? 'actived' : ''
    },
    // 搜索已选区
    searchSelected () {
      this.search(this.selectedList, this.searchSelectedVal, '1')
      this.$set(this.$data, 'selectedList', [...this.selectedList])
    },

    // 搜索
    search (data, searchKey, type) {
      //type 0:待选区 1:已选区
      // 按工号、姓名、部门搜索
      const search = data.filter(
        item =>
          item.jobNumber == searchKey ||
          this.reg(item.name, searchKey) ||
          this.reg(item.department, searchKey)
      )
      let searchCache = []
      data.map(b => {
        searchCache.push(JSON.stringify(b))
      })

      search.map(item => {
        const json = JSON.stringify(item)
        searchCache.splice(searchCache.indexOf(json), 1)

        data.map(b => {
          if (item.name == b.name) {
            type == '0' && (b.highlight = true)
            type == '1' && (b.actived = true)
          }
        })
      })

      searchCache.map(item => {
        const temp = JSON.parse(item)
        data.map(b => {
          if (temp.name == b.name) {
            type == '0' && (b.highlight = false)
            type == '1' && (b.actived = false)
          }
        })
      })
    },
    // 列表与目录切换
    handleChange (val) {
      this.isShowList = val == 1 ? true : false
    },

    onChange (e, record) {
      const checked = e.target.checked
      record.checked = checked
      const depAll = this.treeData[record.department]
      const depSeletedNum = depAll.filter(item => item.checked).length
      this.depChangeState(depAll.length, depSeletedNum, record.department)
      this.update()
    },
    depChangeState (all, selected, department) {
      this.treeTitle.map(item => {
        if (item.title == department) {
          if (selected == all) {
            item.checked = true
            item.indeterminate = false
          } else if (selected > 0) {
            item.checked = false
            item.indeterminate = true
          } else if (selected == 0) {
            item.checked = false
            item.indeterminate = false
          }
        }
      })

      const checkedNum = this.treeTitle.filter(item => item.checked).length
      const indeterminateNum = this.treeTitle.filter(item => item.indeterminate)
        .length

      if (checkedNum == this.treeTitle.length) {
        this.checkAll = true
        this.indeterminate = false
      } else if (checkedNum > 0 || indeterminateNum > 0) {
        this.checkAll = false
        this.indeterminate = true
      } else if (checkedNum == 0) {
        this.checkAll = false
        this.indeterminate = false
      }
    },
    // 更新视图
    update () {
      this.$set(this.$data, 'data', [...data])
      this.selectedList = this.data.filter(item => item.checked)
    },
    // 取选择结果
    getSelectedData () {
      const result = JSON.stringify(this.selectedList)
      alert(result)

      console.log(this.selectedList, '----------选择结果')
    },
    // 清除选项
    clearOneRecord (record) {
      this.data.map(item => item.key == record.key && (item.checked = false))
      const depAll = this.treeData[record.department]
      const depSeletedNum = depAll.filter(item => item.checked).length
      this.depChangeState(depAll.length, depSeletedNum, record.department)
      this.update()
    },
    handleClick () {},
    // 选择部门下全选或全清
    depChange (e, record) {
      const checked = e.target.checked
      record.checked = checked
      this.checkChange(record)
    },
    checkChange (record) {
      this.data.map(
        item =>
          item.department == record.title && (item.checked = record.checked)
      )
      const depAll = this.treeData[record.title]
      const depSeletedNum = depAll.filter(item => item.checked).length
      this.depChangeState(depAll.length, depSeletedNum, record.title)
      this.update()
      this.$set(this.$data, 'treeTitle', [...this.treeTitle])
    },
    // 选择公司下全选或全清
    onCheckAllChange (e) {
      const checked = e.target.checked
      this.checkAll = checked

      this.treeTitle.map(item => {
        item.checked = checked
        this.checkChange(item)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
h3 {
  margin: 0;
  padding: 0;
}
ul {
  list-style-type: none;
  padding: 0;
}

a {
  color: #42b983;
}

._fl {
  float: left;
}
._fr {
  float: right;
}

.content {
  width: 800px;
  margin: 0 auto;
}

.content_main {
  height: 400px;
  margin-top: 20px;
  margin-bottom: 10px;
}
.await_select_part,
.selected_part {
  height: 100%;
  border: solid 1px #d0d0d0;
  border-radius: 4px;
  overflow: hidden;
}

.await_select_part {
  width: 256px;
  height: 400px;
}
.selected_part {
  width: calc(100% - 266px);
  border: 1px solid #d0d0d0;
  padding: 10px;
  border-radius: 4px;
}
.selected_part li {
  width: 100%;
  border: solid 1px #d0d0d0;
  margin-bottom: 10px;
  border-radius: 4px;
  padding: 10px;
}
.actived {
  color: #fb3da1;
}
.checkbox_all {
  position: absolute;
  top: 16px;
  left: 2px;
}
</style>
