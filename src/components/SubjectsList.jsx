"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical, faPlus } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';

export default function SubjectsList({ dir }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [editForm, setEditForm] = useState({ title: '', description: '' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/subjects");
        console.log("API Response:", res.data);
        
        if (res.status === 200) {
          if (Array.isArray(res.data.subjects)) {
            setData(res.data.subjects);
          } else {
            console.error("Subjects data is not an array:", res.data);
            setData([]);
          }
        }
      } catch (err) {
        console.error("Fetch data error:", err);
        setError(err.message || "Failed to fetch subjects");
        setData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (subjectId) => {
    try {
      console.log("Attempting to delete subject:", subjectId);
      
      const response = await axios.delete(`/api/subjects/${subjectId}`);
      console.log("Delete response:", response);
      
      if (response.status === 200) {
        setData(data.filter(item => item._id !== subjectId));
        setShowDeleteModal(false);
        // Optional: Add success toast or message
      }
    } catch (error) {
      console.error("Delete error details:", error.response?.data || error);
      setError(error.response?.data?.message || "Failed to delete subject");
      // Keep modal open to show error
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/api/subjects/${selectedSubject._id}`, editForm);
      if (response.status === 200) {
        setData(data.map(item => 
          item._id === selectedSubject._id 
            ? { ...item, ...editForm }
            : item
        ));
        setShowEditModal(false);
      }
    } catch (error) {
      console.error("Edit error:", error);
      setError("Failed to edit subject");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div className="flex flex-col justify-start items-center content-center gap-3 mt-10">
        {Array.isArray(data) && data.length > 0 ? (
          data.map((item) => (
            <div key={item._id} className="card bg-neutral w-[95%] lg:w-[600px] shadow-2xl">
              <div className="card-body flex flex-col gap-3 p-4 lg:p-8">
                <div className="profile flex flex-row justify-between items-center">
                  <div className="flex flex-row gap-3 justify-start content-center items-center">
                    <div className="avatar">
                      <div className="ring-primary ring-offset-base-100 w-10 h-10 rounded-full ring ring-offset-2">
                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                      </div>
                    </div>
                    <div className="text">
                      <p className="text-lg">{item.title}</p>
                      <p className="opacity-50">{new Date(item.updatedAt).toLocaleString()}</p>
                    </div>
                  </div>
                  <details className={`dropdown ${dir === "rtl" ? "dropdown-start" : "dropdown-end"} `}>
                    <summary className="btn btn-square btn-ghost hover:bg-white/15">
                      <FontAwesomeIcon icon={faEllipsisVertical} />
                    </summary>
                    <ul className="menu dropdown-content bg-neutral-700 rounded-box z-[1] w-52 p-2 shadow">
                      <li><button onClick={() => {
                        setSelectedSubject(item);
                        setEditForm({ title: item.title, description: item.description });
                        setShowEditModal(true);
                      }}>Edit</button></li>
                      <li><button onClick={() => {
                        setSelectedSubject(item);
                        setShowDeleteModal(true);
                      }}>Delete</button></li>
                    </ul>
                  </details>
                </div>
                <div className="p-4 lg:p-8">
                  <Link href={`/subject/${item._id}`}>
                    <p className="text-lg">{item.description}</p>
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center p-4">No subjects found</div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-neutral p-6 rounded-lg">
            <h3 className="text-lg font-bold">Confirm Delete</h3>
            <p className="py-4">Are you sure you want to delete this subject?</p>
            <div className="modal-action">
              <button className="btn btn-error" onClick={() => handleDelete(selectedSubject._id)}>Delete</button>
              <button className="btn btn-ghost" onClick={() => setShowDeleteModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-neutral p-6 rounded-lg w-[95%] max-w-[500px]">
            <h3 className="text-lg font-bold">Edit Subject</h3>
            <form onSubmit={handleEdit} className="flex flex-col gap-4 mt-4">
              <input
                type="text"
                placeholder="Title"
                className="input input-bordered w-full"
                value={editForm.title}
                onChange={(e) => setEditForm({...editForm, title: e.target.value})}
              />
              <textarea
                placeholder="Description"
                className="textarea textarea-bordered w-full"
                value={editForm.description}
                onChange={(e) => setEditForm({...editForm, description: e.target.value})}
              />
              <div className="modal-action">
                <button type="submit" className="btn btn-primary">Save</button>
                <button type="button" className="btn btn-ghost" onClick={() => setShowEditModal(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Link href="/subjects/new" className="btn btn-ghost btn-active rounded-full btn-square fixed bottom-0 left-0 mb-2 ml-2">
        <FontAwesomeIcon icon={faPlus} />
      </Link>
    </>
  );
}
