import React, { useState } from 'react';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { 
  TouchableOpacity, 
  Text, 
  View, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  StatusBar, 
  TextInput, 
  Button, 
  useColorScheme 
} from 'react-native';

  const dateRegex = new RegExp('^\\d\\d\\d\\d-\\d\\d-\\d\\d');

  function jsonDateReviver(key, value) {
    if (dateRegex.test(value)) return new Date(value);
    return value;
  }

  async function graphQLFetch(query, variables = {}) {
    try {
        /****** Q4: Start Coding here. State the correct IP/port******/
        const response = await fetch('http://10.0.2.2:3000/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ query, variables })
        /****** Q4: Code Ends here******/
      });
      const body = await response.text();
      const result = JSON.parse(body, jsonDateReviver);
  
      if (result.errors) {
        const error = result.errors[0];
        if (error.extensions.code == 'BAD_USER_INPUT') {
          const details = error.extensions.exception.errors.join('\n ');
          alert(`${error.message}:\n ${details}`);
        } else {
          alert(`${error.extensions.code}: ${error.message}`);
        }
      }
      return result.data;
    } catch (e) {
      alert(`Error in sending data to server: ${e.message}`);
    }
  }

class IssueFilter extends React.Component {
    render() {
      return (
        <>
        {/****** Q1: Start Coding here. ******/}
        <View>
          <Text>Issue Filter Component</Text>
        </View>
        {/****** Q1: Code ends here ******/}
        </>
      );
    }
}
const styles = StyleSheet.create({
  navBar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#2E5C6E',
    borderBottomWidth: 1,
    borderBottomColor: '#1F3A47',
  },
  customButton: {
    backgroundColor: '#2E5C6E',
    paddingVertical: 10,       
    paddingHorizontal: 20,     
    borderRadius: 5,         
    marginTop: 10,             
    alignItems: 'center',      
  },
  customButtonText: {
    color: '#FFFFFF',        
    fontSize: 16,             
    fontWeight: 'bold',       
  },
  navButton: {
    backgroundColor: '#2E5C6E', 
    paddingVertical: 10,       
    paddingHorizontal: 20,    
    borderRadius: 5,          
    margin: 5,                
    shadowColor: '#000',       
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.1,        
    shadowRadius: 3,           
    elevation: 2,             
  },
  navButtonText: {
    color: '#ffffff',          
    fontSize: 16,              
    fontWeight: 'bold',       
    textAlign: 'center',      
  },
  content: {
    flex: 1,
    padding: 10,
    marginHorizontal: 5,
    alignItems: 'center',
    backgroundColor: '#f7faff', 
  },
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 30,
    backgroundColor: '#f0f4f8', 
  },
  header: {
    height: 60,
    backgroundColor: '#2E5C6E',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    fontSize: 14,
    color: '#333333', 
    paddingHorizontal: 5,
  },
  leftAlignText: {
    textAlign: 'left',
    fontSize: 14,
    color: '#333333',
    paddingHorizontal: 5,
  },
  dataWrapper: {
    marginTop: -1,
    backgroundColor: '#f7faff', 
  },
  row: {
    minHeight: 60,
    backgroundColor: '#ffffff', 
    flexWrap: 'wrap',
    borderBottomWidth: 1,
    borderBottomColor: '#d3d3d3', 
  },
});


const width = [20, 50, 60, 60, 70, 30, 40];

function formatDate(dateString) {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function IssueRow(props) {
    const issue = props.issue;
    {/****** Q2: Coding Starts here. Create a row of data in a variable******/}
    const rowData = [issue.id, issue.title, issue.owner, issue.status, issue.created?.toString(), issue.effort, issue.due?.toString()];
    {/****** Q2: Coding Ends here.******/}
    return (
      <>
      {/****** Q2: Start Coding here. Add Logic to render a row  ******/}
      <Row data={rowData} widthArr={width} style={styles.row} textStyle={styles.text} />
      {/****** Q2: Coding Ends here. ******/}  
      </>
    );
  }
  

  function IssueTable(props) {
    const issueRows = props.issues.map(issue =>
      <IssueRow key={issue.id} issue={issue} />
    );

    {/****** Q2: Start Coding here. Add Logic to initalize table header  ******/}
    const tableHeaders = ['ID', 'Title', 'Owner', 'Status', 'Created', 'Effort', 'Due'];
    {/****** Q2: Coding Ends here. ******/}
    
    
    return (
    <View style={styles.container}>
    {/****** Q2: Start Coding here to render the table header/rows.**********/}
      <Table borderStyle={{ borderWidth: 1, borderColor: '#B0C4DE' }}>
        <Row data={tableHeaders} widthArr={width} style={styles.header} textStyle={styles.text} />
        <ScrollView style={styles.dataWrapper}>
          {issueRows}
        </ScrollView>
      </Table>
    {/****** Q2: Coding Ends here. ******/}
    </View>
    );
  }

  
  class IssueAdd extends React.Component {
    constructor() {
      super();
      this.handleSubmit = this.handleSubmit.bind(this);
      /****** Q3: Start Coding here. Create State to hold inputs******/
      this.state = { title: '', owner: '', effort: '', due: '' };
      /****** Q3: Code Ends here. ******/
    }
  
    /****** Q3: Start Coding here. Add functions to hold/set state input based on changes in TextInput******/
    setTitle = (text) => {
      this.setState({ title: text });
    };
  
    setOwner = (text) => {
      this.setState({ owner: text });
    };
  
    setEffort = (text) => {
      this.setState({ effort: text });
    };
  
    setDueDate = (text) => {
      this.setState({ due: text });
    };
    /****** Q3: Code Ends here. ******/
    
    handleSubmit() {
      /****** Q3: Start Coding here. Create an issue from state variables and call createIssue. Also, clear input field in front-end******/
      const newIssue = {
        title: this.state.title,
        owner: this.state.owner,
        effort: parseInt(this.state.effort, 10) || 0,
        due: this.state.due,
      };
      this.props.createIssue(newIssue);
      this.setState({
        title: '',
        owner: '',
        effort: '',
        due: '',
      });
    }
      /****** Q3: Code Ends here. ******/
  
    render() {
      return (
          <View>
          {/****** Q3: Start Coding here. Create TextInput field, populate state variables. Create a submit button, and on submit, trigger handleSubmit.*******/}
            <TextInput
              placeholder="Enter Title"
              value={this.state.title}
              onChangeText={this.setTitle}
              style={{
                borderWidth: 1,
                borderColor: '#ccc',
                borderRadius: 5,
                marginBottom: 10,
                paddingHorizontal: 10,
                paddingVertical: 6,
              }}
            />
            <TextInput
              placeholder="Enter Owner Name"
              value={this.state.owner}
              onChangeText={this.setOwner}
              style={{
                borderWidth: 1,
                borderColor: '#ccc',
                borderRadius: 5,
                marginBottom: 10,
                paddingHorizontal: 10,
                paddingVertical: 6,
              }}
            />
            <TextInput
              placeholder="Enter Effort (Numeric)"
              value={this.state.effort}
              onChangeText={this.setEffort}
              keyboardType="numeric"
              style={{
                borderWidth: 1,
                borderColor: '#ccc',
                borderRadius: 5,
                marginBottom: 10,
                paddingHorizontal: 10,
                paddingVertical: 6,
              }}
            />
            <TextInput
              placeholder="Enter Due Date (YYYY-MM-DD)"
              value={this.state.due}
              onChangeText={this.setDueDate}
              style={{
                borderWidth: 1,
                borderColor: '#ccc',
                borderRadius: 5,
                marginBottom: 10,
                paddingHorizontal: 10,
                paddingVertical: 6,
              }}
            />
            <TouchableOpacity style={styles.customButton} onPress={this.handleSubmit}>
              <Text style={styles.customButtonText}>Add Issue</Text>
            </TouchableOpacity>
          {/****** Q3: Code Ends here. ******/}
          </View>
      );
    }
  }

class BlackList extends React.Component {
    constructor()
    {   super();
        this.handleSubmit = this.handleSubmit.bind(this);
        /****** Q4: Start Coding here. Create State to hold inputs******/
        this.state = { nameInput: '' };
        /****** Q4: Code Ends here. ******/
    }
    /****** Q4: Start Coding here. Add functions to hold/set state input based on changes in TextInput******/
    setOwner = (text) => {
    this.setState({ nameInput: text });
    };
    /****** Q4: Code Ends here. ******/
    
    async handleSubmit() {
    /****** Q4: Start Coding here. Create an issue from state variables and issue a query. Also, clear input field in front-end******/
      const {nameInput} = this.state;
      // console.log('GraphQL result:', result);

      if (!nameInput.trim()) {
        alert('Owner name cannot be empty.');
        return;
      }
      const query = `mutation addToBlacklist($nameInput: String!) {
        addToBlacklist(nameInput: $nameInput)
      }`;
    
      try {
        const result = await graphQLFetch(query, { nameInput });
        // console.log('GraphQL result:', result);
        alert('successfully added to blacklist'); 
        this.setState({ nameInput: '' }); 
        
      } catch (error) {
        alert(`Error adding owner to blacklist: ${error.message}`);
      }
      // this.setState({ nameInput: '' }); 
    /****** Q4: Code Ends here. ******/
    }

    render() {
    return (
        <View>
        {/****** Q4: Start Coding here. Create TextInput field, populate state variables. Create a submit button, and on submit, trigger handleSubmit.*******/}
          <TextInput
            placeholder="Owner Name"
            value={this.state.nameInput}
            onChangeText={this.setOwner}
            style={{
              borderWidth: 1,
              borderColor: '#d3d3d3', 
              borderRadius: 5,       
              marginBottom: 12,      
              paddingHorizontal: 12, 
              paddingVertical: 8,     
            }}
          />
          <TouchableOpacity style={styles.customButton} onPress={this.handleSubmit}>
            <Text style={styles.customButtonText}>Add to Blacklist</Text>   
          </TouchableOpacity>
        {/****** Q4: Code Ends here. ******/}
        </View>
    );
    }
}

export default class IssueList extends React.Component {
    constructor() {
        super();
        this.state = { issues: [], currentView : 'Q1', };
        this.createIssue = this.createIssue.bind(this);
        this.setView = this.setView.bind(this);
    }
    
    componentDidMount() {
    this.loadData();
    }

    async loadData() {
    const query = `query {
        issueList {
        id title status owner
        created effort due
        }
    }`;

    const data = await graphQLFetch(query);
    if (data) {
        this.setState({ issues: data.issueList });
    }
    }

    async createIssue(issue) {
    const query = `mutation issueAdd($issue: IssueInputs!) {
        issueAdd(issue: $issue) {
        id
        }
    }`;

    const data = await graphQLFetch(query, { issue });
    if (data) {
        this.loadData();
    }
    }
    
    setView(view) {
      this.setState({ currentView : view });
    }
    
    render() {
    return (
      <View style={styles.container}>
        <View style={styles.navBar}>
          <TouchableOpacity style={styles.navButton} onPress={() => this.setView('Q1')}>
            <Text style={styles.navButtonText}>Issue Filter</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButton} onPress={() => this.setView('Q2')}>
            <Text style={styles.navButtonText}>Issue Table</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButton} onPress={() => this.setView('Q3')}>
            <Text style={styles.navButtonText}>Issue Add</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButton} onPress={() => this.setView('Q4')}>
            <Text style={styles.navButtonText}>Blacklist</Text>
          </TouchableOpacity>
        </View>
    
        <View style={styles.content}>
          {this.state.currentView === 'Q1' && <IssueFilter />}
          {this.state.currentView === 'Q2' && <IssueTable issues={this.state.issues} />}
          {this.state.currentView === 'Q3' && <IssueAdd createIssue={this.createIssue} />}
          {this.state.currentView === 'Q4' && <BlackList />}
        </View>
      </View>
    );  
  }
}
